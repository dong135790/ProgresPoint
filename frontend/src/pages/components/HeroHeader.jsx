import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import heroImg from "../../assets/ProgressPointHero.png";

const imageSrc = heroImg;
const alt = "Progress Point header";

export default function HeroHeader({
  title,
  subtitle,
  showOverlay = false,
  maxHeight = "70vh", // optional cap
}) {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Full-width, no crop. Height auto based on image ratio. */}
      <Box
        component="img"
        src={imageSrc}
        alt={alt}
        sx={{
          width: "100%",
          height: "auto",
          maxHeight,          // keeps it from being too tall
          display: "block",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />

      {showOverlay && (title || subtitle) && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 2,
            pointerEvents: "none",
          }}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#111",
                textShadow: "0 2px 18px rgba(255,255,255,0.7)",
              }}
            >
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography
              sx={{
                mt: 1,
                color: "rgba(17,17,17,0.7)",
                textShadow: "0 2px 18px rgba(255,255,255,0.7)",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
