"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import type { FilterSettings } from "@/types/index";
import { DEFAULT_FILTERS } from "@/constants";

interface DemoCustomizeTabProps {
  filters: FilterSettings;
  onFiltersChange: (filters: FilterSettings) => void;
  isWebsiteDark: boolean;
}

export function DemoCustomizeTab({
  filters,
  onFiltersChange,
  isWebsiteDark,
}: DemoCustomizeTabProps) {
  const [localFilters, setLocalFilters] = useState<FilterSettings>(filters);

  // Sync localFilters with filters prop when it changes externally (e.g., reset)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof FilterSettings, value: number) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-2">
      {/* Visual Adjustments Section */}
      <div className="space-y-2">
        <div>
          <h2 
            className="text-sm font-semibold"
            style={{
              color: isWebsiteDark
                ? 'hsl(210 40% 98%)'
                : 'hsl(0 0% 0%)',
            }}
          >
            Visual Adjustments
          </h2>
        </div>

        <Slider
          value={localFilters.brightness}
          min={0}
          max={200}
          onChange={(value) => handleFilterChange("brightness", value)}
          label="Brightness"
          unit="%"
          isWebsiteDark={isWebsiteDark}
        />

        <Slider
          value={localFilters.contrast}
          min={0}
          max={200}
          onChange={(value) => handleFilterChange("contrast", value)}
          label="Contrast"
          unit="%"
          isWebsiteDark={isWebsiteDark}
        />

        <Slider
          value={localFilters.saturation}
          min={0}
          max={200}
          onChange={(value) => handleFilterChange("saturation", value)}
          label="Saturation"
          unit="%"
          isWebsiteDark={isWebsiteDark}
        />
      </div>

      {/* Color Effects Section */}
      <div 
        className="space-y-2 pt-1.5 border-t"
        style={{
          borderColor: isWebsiteDark
            ? 'hsl(217.2 32.6% 17.5%)'
            : 'hsl(214.3 31.8% 91.4%)',
        }}
      >
        <div>
          <h2 
            className="text-sm font-semibold"
            style={{
              color: isWebsiteDark
                ? 'hsl(210 40% 98%)'
                : 'hsl(0 0% 0%)',
            }}
          >
            Color Effects
          </h2>
        </div>

        <Slider
          value={localFilters.sepia}
          min={0}
          max={100}
          onChange={(value) => handleFilterChange("sepia", value)}
          label="Sepia"
          unit="%"
          isWebsiteDark={isWebsiteDark}
        />

        <Slider
          value={localFilters.grayscale}
          min={0}
          max={100}
          onChange={(value) => handleFilterChange("grayscale", value)}
          label="Grayscale"
          unit="%"
          isWebsiteDark={isWebsiteDark}
        />
      </div>
    </div>
  );
}

