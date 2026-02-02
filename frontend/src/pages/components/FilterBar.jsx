import { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function FilterBar({ exercises = [], value, onChange, onClear }) {
  const { bodyPart = "all", equipment = "all", target = "all" } = value || {};

  const bodyPartOptions = useMemo(() => {
    const set = new Set(exercises.map((e) => e.bodyPart).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [exercises]);

  const equipmentOptions = useMemo(() => {
    const set = new Set(exercises.map((e) => e.equipment).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [exercises]);

  const targetOptions = useMemo(() => {
    const set = new Set(exercises.map((e) => e.target).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [exercises]);

  function update(next) {
    onChange?.({ bodyPart, equipment, target, ...next });
  }

  // ✅ one reusable style for all dropdowns
  const dropdownSx = {
    minWidth: 220,
    "& .MuiFilledInput-root": {
      backgroundColor: "#e7eaee",   // light gray instead of white
      borderRadius: 2,
      overflow: "hidden",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "#dde2e7",
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "#e7eaee",
    },
    "& .MuiInputLabel-root": {
      color: "rgba(0,0,0,0.7)",
      fontWeight: 600,
    },
    "& .MuiSelect-select": {
      color: "#111",
    },
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
          <TextField
            select
            label="General"
            value={bodyPart}
            onChange={(e) => update({ bodyPart: e.target.value })}
            variant="filled"
            size="small"
            sx={dropdownSx}
          >
            {bodyPartOptions.map((bp) => (
              <MenuItem key={bp} value={bp}>
                {bp}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Equipment"
            value={equipment}
            onChange={(e) => update({ equipment: e.target.value })}
            variant="filled"
            size="small"
            sx={dropdownSx}
          >
            {equipmentOptions.map((eq) => (
              <MenuItem key={eq} value={eq}>
                {eq}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Muscle Target"
            value={target}
            onChange={(e) => update({ target: e.target.value })}
            variant="filled"
            size="small"
            sx={{ ...dropdownSx, minWidth: 240 }}
          >
            {targetOptions.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Button
          variant="outlined"
          onClick={onClear}
          sx={{
            whiteSpace: "nowrap",
            borderColor: "rgba(255,255,255,0.35)",
            color: "#fff",
            "&:hover": { borderColor: "rgba(255,255,255,0.6)" },
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
}
