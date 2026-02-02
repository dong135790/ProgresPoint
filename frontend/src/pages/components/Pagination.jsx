import { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Pagination({
  page = 0,
  setPage,
  totalPages = 1,
  enableHotkeys = true,
}) {
  // Clamp page if totalPages shrinks
  useEffect(() => {
    if (!setPage) return;
    setPage((p) => Math.min(p, Math.max(0, totalPages - 1)));
  }, [totalPages, setPage]);

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  const goPrev = useMemo(() => {
    return () => setPage?.((p) => Math.max(0, p - 1));
  }, [setPage]);

  const goNext = useMemo(() => {
    return () => setPage?.((p) => Math.min(totalPages - 1, p + 1));
  }, [setPage, totalPages]);

  // Keyboard arrows: Left/Right to change pages (unless typing)
  useEffect(() => {
    if (!enableHotkeys) return;

    function onKeyDown(e) {
      const el = document.activeElement;
      const typing =
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);

      if (typing) return;

      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableHotkeys, goPrev, goNext]);

  if (totalPages <= 1) {
    // Optional: hide pagination if only 1 page
    return null;
  }

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Button variant="outlined" onClick={goPrev} disabled={isFirst}>
        ← Prev
      </Button>

      <Typography sx={{ opacity: 0.8 }}>
        Page <b>{page + 1}</b> of <b>{totalPages}</b>
      </Typography>

      <Button variant="outlined" onClick={goNext} disabled={isLast}>
        Next →
      </Button>
    </Box>
  );
}
