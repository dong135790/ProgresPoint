import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#b4cbe2",
        borderBottom: "1px solid rgba(0,0,0,0.10)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,              // ✅ fixed height
          px: 2,                      // horizontal padding
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <Typography sx={{ fontWeight: 800, letterSpacing: 0.3, color: "#111" }}>
          Progress Point
        </Typography>

        {/* Right side placeholder (buttons later) */}
        <Box sx={{ display: "flex", gap: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
