import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip } from "@mui/material";

const CARD_W = 220;
const CARD_H = 140;

export default function ExerciseGrid({ exercises = [], onExerciseClick }) {
  if (!exercises.length) {
    return (
      <Typography sx={{ mt: 2, opacity: 0.7, textAlign: "center" }}>
        Loading exercises...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        justifyContent: "center", // centers the whole grid nicely
        gridTemplateColumns: `repeat(auto-fit, minmax(${CARD_W}px, ${CARD_W}px))`,
      }}
    >
      {exercises.map((ex) => (
        <Card
          key={ex.id}
          variant="outlined"
          sx={{
            width: CARD_W,
            height: CARD_H,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
          }}
        >
          <CardActionArea
            sx={{ height: "100%" }}
            onClick={() => onExerciseClick?.(ex)}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={800}
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {ex.name}
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {ex.target && <Chip label={ex.target} size="small" />}
                {ex.bodyPart && <Chip label={ex.bodyPart} size="small" />}
                {ex.equipment && <Chip label={ex.equipment} size="small" />}
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
