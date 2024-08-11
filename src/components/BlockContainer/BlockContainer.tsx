import React, { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import debounce from "lodash.debounce";
import { IBlock, initialBlocks } from "../data/initialBlock";

const BlockContainer: React.FC = () => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [deletedBlocks, setDeletedBlocks] = useState<IBlock[]>([]);
  const [highestZIndex, setHighestZIndex] = useState<number>(5);
  const [activeBlockId, setActiveBlockId] = useState<number | null>(null);
  const [prevZIndex, setPrevZIndex] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const savedBlocks = localStorage.getItem("blocks");
    const savedDeletedBlocks = localStorage.getItem("deletedBlocks");

    if (savedBlocks) {
      const parsedBlocks = JSON.parse(savedBlocks);
      if (parsedBlocks.length > 0) {
        setBlocks(parsedBlocks);
      } else {
        initializeDefaultBlocks();
      }
    } else {
      initializeDefaultBlocks();
    }

    if (savedDeletedBlocks) {
      setDeletedBlocks(JSON.parse(savedDeletedBlocks));
    }

    const maxZIndex = savedBlocks
      ? Math.max(
          ...JSON.parse(savedBlocks).map((block: IBlock) => block.zIndex)
        )
      : 5;
    setHighestZIndex(maxZIndex);
  }, []);

  const initializeDefaultBlocks = () => {
    setBlocks(initialBlocks);
    localStorage.setItem("blocks", JSON.stringify(initialBlocks));
  };

  const saveBlocksToLocalStorage = useCallback(
    debounce((updatedBlocks: IBlock[]) => {
      localStorage.setItem("blocks", JSON.stringify(updatedBlocks));
      console.log("Blocks saved to localStorage:", updatedBlocks);
    }, 1000),
    []
  );

  useEffect(() => {
    if (blocks.length > 0) {
      saveBlocksToLocalStorage(blocks);
    }

    if (deletedBlocks.length > 0) {
      localStorage.setItem("deletedBlocks", JSON.stringify(deletedBlocks));
      console.log("Deleted blocks updated in localStorage:", deletedBlocks);
    }
  }, [blocks, deletedBlocks, saveBlocksToLocalStorage]);

  const toFront = (id: number) => {
    setActiveBlockId(id);
    setPrevZIndex((prev) => {
      const currentBlock = blocks.find((block) => block.id === id);
      const newZIndex = highestZIndex + 1;

      if (currentBlock) {
        setBlocks(
          blocks.map((block) =>
            block.id === id ? { ...block, zIndex: newZIndex } : block
          )
        );
        setHighestZIndex(newZIndex);

        return new Map(prev).set(id, currentBlock.zIndex);
      }
      return prev;
    });
  };

  const resetZIndex = (id: number) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, zIndex: prevZIndex.get(id) || 1 } : block
      )
    );
  };

  const updateBlockPosition = (
    id: number,
    newPosition: { x: number; y: number }
  ) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id
          ? {
              ...block,
              x: Math.max(
                0,
                Math.min(newPosition.x, window.innerWidth - block.width)
              ),
              y: Math.max(
                0,
                Math.min(newPosition.y, window.innerHeight - block.height)
              ),
            }
          : block
      )
    );
  };

  const updateBlockSize = (
    id: number,
    newSize: { width: number; height: number }
  ) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id
          ? { ...block, width: newSize.width, height: newSize.height }
          : block
      )
    );
  };

  const deleteBlock = (id: number) => {
    const blockToDelete = blocks.find((block) => block.id === id);
    if (blockToDelete) {
      setDeletedBlocks([...deletedBlocks, blockToDelete]);
      setBlocks(blocks.filter((block) => block.id !== id));
    }
  };

  const restoreBlock = () => {
    if (deletedBlocks.length > 0) {
      const lastDeleted = deletedBlocks.pop();
      if (lastDeleted) {
        setBlocks([
          ...blocks,
          {
            ...lastDeleted,
            width: 300,
            height: 100,
            x: window.innerWidth / 2 - 150,
            y: window.innerHeight / 2 - 50,
            zIndex: highestZIndex + 1,
          },
        ]);
        setHighestZIndex(highestZIndex + 1);
      }
    }
  };

  return (
    <div>
      {deletedBlocks.length > 0 && (
        <button
          onClick={restoreBlock}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Відновити видалений блок
        </button>
      )}
      <div className="relative w-full h-full border border-black">
        {blocks.map((block) => (
          <Rnd
            key={block.id}
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            onMouseDown={() => toFront(block.id)}
            enableResizing
            onDragStop={(e, d) =>
              updateBlockPosition(block.id, { x: d.x, y: d.y })
            }
            onResizeStop={(e, direction, ref, delta, position) => {
              updateBlockPosition(block.id, position);
              updateBlockSize(block.id, {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
              });
            }}
            onMouseUp={() => {
              if (activeBlockId === block.id) {
                resetZIndex(block.id);
                setActiveBlockId(null);
              }
            }}
            className="relative bg-slate-600"
            style={{ zIndex: block.zIndex }}
          >
            <div className="w-full h-full bg-light-gray border border-black relative">
              {block.content}
              <button
                onClick={() => deleteBlock(block.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default BlockContainer;
