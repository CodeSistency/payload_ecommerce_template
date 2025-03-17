"use client";

import React from 'react';
import type { TextFieldClientComponent } from 'payload';
import { useField } from '@payloadcms/ui';

export const ColorPicker: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path }); // Type as string for hex values

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => setValue(e.target.value)}
          className="w-10 h-10 rounded-full border-2 border-white p-0 cursor-pointer bg-transparent shadow-[0_0_0_1px_#ccc]"
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          placeholder="#000000"
          className="w-24 p-1 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default ColorPicker;