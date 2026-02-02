import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/NavBar";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

const API_BASE = "https://progrespoint-backend1.onrender.com/api/exercises/";

export default function ExerciseDetail() {
  const { id } = useParams(); // e.g. "0001"
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const imageUrl = useMemo(() => {
    return `https://progrespoint-backend1.onrender.com/api/exercises/image?exerciseId=${id}&resolution=360`;
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchExercise() {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await fetch(`${API_BASE}${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);

        const data = await res.json();
        setExercise(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorMsg(err.message || "Failed to load exercise.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchExercise();
    return () => controller.abort();
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#909296",
        color: "#111827",
      }}
    >
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2, bgcolor: "#f2eeeeff", borderColor: "#222121ff", "&:hover": { borderColor: "rgba(126, 18, 18, 0.6)" } }}>
          ← Back
        </Button>

        {loading && (
          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: 3,
              bgcolor: "#ffffff",
            }}
          >
            <CircularProgress size={22} />
            <Typography>Loading…</Typography>
          </Paper>
        )}

        {!loading && errorMsg && (
          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              borderRadius: 3,
              bgcolor: "#ffffff",
              border: "1px solid rgba(220, 38, 38, 0.25)",
            }}
          >
            <Typography sx={{ color: "#b91c1c", fontWeight: 600 }}>
              Couldn’t load exercise: {errorMsg}
            </Typography>
            <Button variant="outlined" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </Paper>
        )}

        {!loading && !errorMsg && exercise && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {/* LEFT: Image */}
            <Paper
              elevation={1}
              sx={{
                borderRadius: 3,
                p: 2,
                minHeight: { xs: 360, md: 520 },
                display: "grid",
                placeItems: "center",
                bgcolor: "#ffffff",                       // ✅ white surface
                border: "1px solid rgba(17, 24, 39, 0.10)",
              }}
            >
              <Box
                component="img"
                src={imageUrl}
                alt={`${exercise.name} demo`}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: { xs: 320, md: 480 },
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <Typography sx={{ mt: 1, color: "rgba(17,24,39,0.65)", textAlign: "center" }}>
                {exercise.name}
              </Typography>
            </Paper>

            {/* RIGHT: Text */}
            <Paper
              elevation={1}
              sx={{
                borderRadius: 3,
                p: 3,
                bgcolor: "#ffffff",                       // ✅ white surface
                border: "1px solid rgba(17, 24, 39, 0.10)",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: "#111827" }}>
                {exercise.name}
              </Typography>

              {/* Key/Value rows */}
              <Stack spacing={1}>
                <Row label="Category" value={exercise.category || "—"} />
                <Row label="Difficulty" value={exercise.difficulty || "—"} />
                <Row label="Equipment" value={exercise.equipment || "—"} />
                <Row
                  label="Target"
                  value={
                    <>
                      {exercise.target || "—"}
                      {Array.isArray(exercise.secondaryMuscles) &&
                      exercise.secondaryMuscles.length > 0 ? (
                        <Typography component="span" sx={{ color: "rgba(17,24,39,0.6)", ml: 1 }}>
                          ({exercise.secondaryMuscles.join(", ")})
                        </Typography>
                      ) : null}
                    </>
                  }
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#111827" }}>
                Description
              </Typography>
              <Typography sx={{ color: "rgba(17,24,39,0.85)", lineHeight: 1.6 }}>
                {exercise.description || "No description provided."}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#111827" }}>
                Instructions
              </Typography>

              {Array.isArray(exercise.instructions) && exercise.instructions.length ? (
                <Box
                  component="ol"
                  sx={{
                    m: 0,
                    pl: 2.5,
                    lineHeight: 1.8,
                    color: "rgba(17,24,39,0.85)",
                  }}
                >
                  {exercise.instructions.map((step, idx) => (
                    <li key={idx}>
                      <Typography component="span" sx={{ color: "rgba(17,24,39,0.85)" }}>
                        {step}
                      </Typography>
                    </li>
                  ))}
                </Box>
              ) : (
                <Typography sx={{ color: "rgba(17,24,39,0.85)" }}>
                  No instructions provided.
                </Typography>
              )}
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}

/** Small helper so the layout stays clean */
function Row({ label, value }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "baseline" }}>
      <Typography sx={{ minWidth: 110, fontWeight: 800, color: "rgba(17,24,39,0.75)" }}>
        {label}:
      </Typography>
      <Typography sx={{ color: "rgba(17,24,39,0.9)" }}>{value}</Typography>
    </Box>
  );
}
