

## Summary
This plan covers UI styling updates to the Patient Filter Component Example page, including title changes, button color updates, and search icon alignment adjustments.

---

## Changes Overview

### 1. Update Page Title
**File:** `src/pages/Index.tsx`
- Change "Patient Filter Example" to "Patient Filter Component Example"

### 2. Update Button Styling (Filter CTA Buttons)
**Files:** `src/components/PatientFilterA.tsx`, `src/components/PatientFilterB.tsx`

Update the "Patient ID A" and "Patient ID B" filter toggle buttons:
- Background color: `#EEF1F4`
- Hover background: `#DDE0E5`
- Border/outline color: `#EEF1F4`
- Text color: `#1A1C1E`

Current styling uses blue (`#0070C0`), will be changed to the new light gray color scheme.

### 3. Update "Copy All IDs" Button
**File:** `src/pages/Index.tsx`

Apply the same styling to the "Copy All IDs" button:
- Background: `#EEF1F4`
- Hover: `#DDE0E5`
- Text color: `#1A1C1E`

### 4. Align Search Icon with Placeholder Text
**Files:** `src/components/PatientFilterA.tsx`, `src/components/PatientFilterB.tsx`

Currently, the search icon is positioned with `top-3` (12px from top). The input text area has `p-3` (12px padding) which should align them, but the icon may not be vertically centered with the text baseline.

Adjustment needed:
- Move the search icon from `top-3` to a position that vertically aligns with the first line of text in the input field
- The input text uses `text-base` (16px font size), so the icon should be centered at approximately the same vertical position as the text baseline

---

## Technical Details

### Button Color Changes

**PatientFilterA.tsx (lines 216-224):**
```tsx
// Before
className={`flex items-center gap-2 text-white border-2 rounded-2xl transition-all duration-200 ${
  isOpen 
    ? 'bg-[#0070C0] border-blue-500' 
    : 'bg-[#0070C0] border-transparent hover:bg-[#005FAB] hover:text-white'
}`}

// After  
className={`flex items-center gap-2 text-[#1A1C1E] border-2 rounded-2xl transition-all duration-200 ${
  isOpen 
    ? 'bg-[#EEF1F4] border-[#EEF1F4]' 
    : 'bg-[#EEF1F4] border-[#EEF1F4] hover:bg-[#DDE0E5] hover:border-[#DDE0E5]'
}`}
```

**PatientFilterB.tsx (lines 210-217):**
Same changes as PatientFilterA.

**Index.tsx Copy All IDs button (lines 43-48):**
```tsx
// Before
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"

// After
className="px-4 py-2 bg-[#EEF1F4] hover:bg-[#DDE0E5] text-[#1A1C1E] text-sm rounded-md transition-colors border border-[#EEF1F4]"
```

### Search Icon Alignment

**PatientFilterA.tsx & PatientFilterB.tsx:**
```tsx
// Before - line 248 (A) / 242 (B)
<div className="absolute top-3 left-3 z-10">
  <Search className="h-4 w-4 text-muted-foreground" />
</div>

// After - center the icon with the text line height
<div className="absolute left-3 z-10" style={{ top: '14px' }}>
  <Search className="h-4 w-4 text-muted-foreground" />
</div>
```

The adjustment moves the icon from `top-3` (12px) to 14px to better align with the text baseline considering the padding and line height of the input.

### Badge Counter Color Update

The patient count badge on the filter buttons uses `text-blue-600` which should be updated to match the new color scheme:
```tsx
// Before
<span className="ml-2 bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">

// After
<span className="ml-2 bg-white text-[#1A1C1E] px-2 py-0.5 rounded-full text-xs font-medium">
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Title update, Copy All IDs button styling |
| `src/components/PatientFilterA.tsx` | Button colors, search icon alignment, badge color |
| `src/components/PatientFilterB.tsx` | Button colors, search icon alignment, badge color |

