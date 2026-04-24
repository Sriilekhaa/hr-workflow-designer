import React, { useCallback } from 'react';

interface KeyValueEditorProps {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
  label?: string;
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({ value, onChange, label = 'Custom Fields' }) => {
  const entries = Object.entries(value);

  const handleKeyChange = useCallback(
    (oldKey: string, newKey: string) => {
      const newValue = { ...value };
      const val = newValue[oldKey];
      delete newValue[oldKey];
      newValue[newKey] = val;
      onChange(newValue);
    },
    [value, onChange]
  );

  const handleValueChange = useCallback(
    (key: string, newVal: string) => {
      onChange({ ...value, [key]: newVal });
    },
    [value, onChange]
  );

  const addField = useCallback(() => {
    const key = `field_${entries.length + 1}`;
    onChange({ ...value, [key]: '' });
  }, [value, entries.length, onChange]);

  const removeField = useCallback(
    (key: string) => {
      const newValue = { ...value };
      delete newValue[key];
      onChange(newValue);
    },
    [value, onChange]
  );

  return (
    <div className="space-y-4 pt-4 border-t border-white/5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-400">{label}</label>
        <button
          type="button"
          onClick={addField}
          className="text-violet-400 hover:text-violet-300 transition-colors text-xs font-bold"
        >
          + Add Field
        </button>
      </div>
      <div className="space-y-2">
        {entries.map(([key, val]) => (
          <div key={key} className="flex gap-2 items-center">
            <input
              type="text"
              value={key}
              onChange={(e) => handleKeyChange(key, e.target.value)}
              className="w-1/3 bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-gray-400 focus:ring-1 focus:ring-violet-500 outline-none"
              placeholder="Key"
            />
            <input
              type="text"
              value={val}
              onChange={(e) => handleValueChange(key, e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-white focus:ring-1 focus:ring-violet-500 outline-none"
              placeholder="Value"
            />
            <button
              type="button"
              onClick={() => removeField(key)}
              className="text-gray-500 hover:text-rose-400 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-[10px] text-gray-600 italic">No fields. Click "+ Add Field" to start.</p>
        )}
      </div>
    </div>
  );
};

export default KeyValueEditor;
