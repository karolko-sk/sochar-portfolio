import React from 'react';
import { MaterialCategory } from '@/types';

interface CategoryFilterProps {
  activeCategory: MaterialCategory;
  onSelectCategory: (category: MaterialCategory) => void;
  counts: Record<MaterialCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { key: MaterialCategory; label: string }[] = [
    { key: 'all', label: 'Všechna díla' },
    { key: 'available', label: 'K dispozici' },
    { key: 'bronze', label: 'Patinovaný bronz' },
    { key: 'stone', label: 'Kámen & Mramor' },
    { key: 'steel-glass', label: 'Ocel, Sklo & Dřevo' },
    { key: 'sold', label: 'Archiv realizací' },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-3 border-b border-[#E5E2DA]">
      <div className="flex items-center space-x-2 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count = counts[cat.key] ?? 0;

          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#121214] text-white border-[#121214] font-medium'
                  : 'bg-transparent text-[#666560] border-transparent hover:border-[#D4D0C5] hover:text-[#121214]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] ${
                  isActive ? 'text-white/70' : 'text-[#98968F]'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
