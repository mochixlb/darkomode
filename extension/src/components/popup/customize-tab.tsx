import React, { useCallback, useState, useEffect, useRef } from "react";
import { saveSettings } from "@/utils/storage";
import { sendMessageToTab, getActiveTab } from "@/utils/messaging";
import { debounce, throttle } from "@/utils/utils";
import { Slider } from "@/components/ui/slider";
import type { FilterSettings } from "@/types/index";
import { DEFAULT_FILTERS } from "@/constants";

interface CustomizeTabProps {
  filters: FilterSettings;
  onFiltersChange: (filters: FilterSettings) => void;
  error: string | null;
  onResetStateChange?: (state: {
    handleReset: () => void;
    isResetting: boolean;
  }) => void;
}

export function CustomizeTab({
  filters,
  onFiltersChange,
  error,
  onResetStateChange,
}: CustomizeTabProps) {
  const [isSaving, setIsSaving] = useState(false);
  // Initialize local state from props.
  // We don't sync props -> local state afterwards to avoid conflicts during rapid updates (dragging).
  const [localFilters, setLocalFilters] = useState<FilterSettings>(filters);
  
  // 1. Visual Update (Throttled)
  const applyVisualFilters = useCallback(async (newFilters: FilterSettings) => {
    try {
      const tab = await getActiveTab();
      if (tab.id) {
        await sendMessageToTab(tab.id, {
          type: "UPDATE_FILTERS",
          filters: newFilters,
        });
      }
    } catch {
      // Silently fail - visual sync is non-critical
    }
  }, []);

  const throttledVisualUpdate = useRef(
    throttle((newFilters: FilterSettings) => {
      applyVisualFilters(newFilters);
    }, 32) // ~30fps
  ).current;

  // 2. Storage Update (Debounced)
  const persistFilters = useCallback(async (newFilters: FilterSettings) => {
    setIsSaving(true);
    try {
      await saveSettings({ filters: newFilters });
      onFiltersChange(newFilters);
    } catch {
      // Revert to last known good state from parent
      setLocalFilters(filters);
    } finally {
      setIsSaving(false);
    }
  }, [filters, onFiltersChange]);

  const debouncedStorageUpdate = useRef(
    debounce((newFilters: FilterSettings) => {
      persistFilters(newFilters);
    }, 1200)
  ).current;

  /**
   * Handles filter changes with immediate UI update and debounced save
   */
  const handleFilterChange = useCallback(
    (key: keyof FilterSettings, value: number) => {
      const newFilters = { ...localFilters, [key]: value };
      setLocalFilters(newFilters);
      
      // Trigger updates
      throttledVisualUpdate(newFilters);
      debouncedStorageUpdate(newFilters);
    },
    [localFilters, throttledVisualUpdate, debouncedStorageUpdate]
  );

  /**
   * Resets all filters to default values
   */
  const resetFilters = useCallback(async () => {
    setLocalFilters(DEFAULT_FILTERS);
    
    setIsSaving(true);
    try {
      await saveSettings({ filters: DEFAULT_FILTERS });
      onFiltersChange(DEFAULT_FILTERS);
      await applyVisualFilters(DEFAULT_FILTERS);
    } catch {
      // Revert on error
      setLocalFilters(filters);
    } finally {
      setIsSaving(false);
    }
  }, [filters, onFiltersChange, applyVisualFilters]);

  // Expose reset state to parent - call on mount and when state changes
  useEffect(() => {
    onResetStateChange?.({
      handleReset: resetFilters,
      isResetting: isSaving,
    });
  }, [resetFilters, isSaving, onResetStateChange]);

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-2 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Visual Adjustments Section */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
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
        />

        <Slider
          value={localFilters.contrast}
          min={0}
          max={200}
          onChange={(value) => handleFilterChange("contrast", value)}
          label="Contrast"
          unit="%"
        />

        <Slider
          value={localFilters.saturation}
          min={0}
          max={200}
          onChange={(value) => handleFilterChange("saturation", value)}
          label="Saturation"
          unit="%"
        />
      </div>

      {/* Color Effects Section */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
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
        />

        <Slider
          value={localFilters.grayscale}
          min={0}
          max={100}
          onChange={(value) => handleFilterChange("grayscale", value)}
          label="Grayscale"
          unit="%"
        />
      </div>
    </div>
  );
}
