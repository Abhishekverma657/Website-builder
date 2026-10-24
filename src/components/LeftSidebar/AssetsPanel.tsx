import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Check, Plus } from 'lucide-react';
import { useBuilder } from '../../context/BuilderContext';
import { Asset } from '../../types/builder';

const CURATED_ASSETS: Asset[] = [
  {
    id: 'asset-curated-1',
    name: 'Modern Studio Interior',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Default',
  },
  {
    id: 'asset-curated-2',
    name: 'Minimal Architecture',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Default',
  },
  {
    id: 'asset-curated-3',
    name: 'Creative Workspace',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Default',
  },
  {
    id: 'asset-curated-4',
    name: 'Editorial Concrete Facade',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Default',
  },
  {
    id: 'asset-curated-5',
    name: 'Abstract Spatial Light',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    createdAt: 'Default',
  },
];

export const AssetsPanel: React.FC = () => {
  const {
    project,
    addAsset,
    deleteAsset,
    selectedElement,
    updateElementAttributes,
    updateElementStyles,
    addElement,
  } = useBuilder();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const allAssets = [...(project.assets || []), ...CURATED_ASSETS];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      const isVideo = file.type.startsWith('video/');
      reader.onload = () => {
        const result = reader.result as string;
        addAsset({
          id: `asset-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: file.name,
          type: isVideo ? 'video' : 'image',
          url: result,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          createdAt: new Date().toLocaleDateString(),
        });

        // If an image element is currently selected, automatically set its src!
        if (selectedElement && selectedElement.tag === 'img' && !isVideo) {
          updateElementAttributes(selectedElement.id, { src: result, alt: file.name });
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplyAsset = (asset: Asset) => {
    if (!selectedElement) {
      // Insert new image element
      addElement('image');
      return;
    }

    if (selectedElement.tag === 'img') {
      updateElementAttributes(selectedElement.id, { src: asset.url, alt: asset.name });
    } else if (selectedElement.tag === 'video') {
      updateElementAttributes(selectedElement.id, { src: asset.url });
    } else {
      // Set as background image on container/section/div
      updateElementStyles(selectedElement.id, {
        backgroundImage: `url(${asset.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0c1414] text-[#e2e8f0] select-none overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-3 border-b border-emerald-950/40">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
          <span>Assets &amp; Media</span>
          <span className="text-[10px] font-mono text-gray-400 font-normal">
            {allAssets.length} files
          </span>
        </h3>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Upload images &amp; videos from your computer
        </p>
      </div>

      {/* Upload Button & Dropzone */}
      <div className="p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-emerald-900/50 hover:border-emerald-500 bg-[#080e0e] hover:bg-[#101b1b] text-gray-300 hover:text-white transition group shadow-neu-inset"
        >
          <div className="p-2.5 rounded-full bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition mb-2 shadow-sm">
            <Upload className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold">Upload from Computer</span>
          <span className="text-[10px] text-gray-500 mt-0.5">PNG, JPG, SVG, WebP, MP4</span>
        </button>
      </div>

      {/* Selected Element Notice */}
      {selectedElement && (
        <div className="mx-3 mb-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-teal-300 flex items-center justify-between shadow-neu-sm">
          <span className="truncate">
            Selected: <strong className="text-white">{selectedElement.name}</strong>
          </span>
          <span className="text-[9px] uppercase font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
            Click asset to apply
          </span>
        </div>
      )}

      {/* Assets Grid */}
      <div className="p-3 pt-0 space-y-2">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          Library
        </div>

        <div className="grid grid-cols-2 gap-2">
          {allAssets.map((asset) => {
            const isUserAsset = (project.assets || []).some((a) => a.id === asset.id);
            return (
              <div
                key={asset.id}
                onClick={() => handleApplyAsset(asset)}
                className="group relative rounded-lg overflow-hidden border border-emerald-950/50 hover:border-emerald-500/70 bg-[#080e0e] cursor-pointer aspect-square transition shadow-neu-sm"
              >
                {asset.type === 'video' ? (
                  <video src={asset.url} className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                  />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-1.5 transition">
                  <div className="flex justify-end">
                    {isUserAsset && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAsset(asset.id);
                        }}
                        className="p-1 rounded bg-red-600/80 hover:bg-red-600 text-white"
                        title="Delete asset"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="text-[10px] text-white font-medium truncate">
                    {asset.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
