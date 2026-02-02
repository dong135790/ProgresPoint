import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ExerciseGrid from "../components/ExerciseGrid";
import FilterBar from "../components/FilterBar";
import HeroHeader from "../components/HeroHeader";
import Navbar from "../components/NavBar";
import Pagination from "../components/Pagination";


const API_URL = "https://progrespoint-backend1.onrender.com/api/exercises/";

export default function Homepage() {
    // Data State
    const [allExercises, setAllExercises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    // Filter State
    const [selectedBodyPart, setSelectedBodyPart] = useState("all");
    const [selectedEquipment, setSelectedEquipment] = useState("all");
    const [selectedTarget, setSelectedTarget] = useState("all");
    // Page State
    const [page, setPage] = useState(0);
    const pageSize = 25;

    // Fetch exercises on mount
    useEffect(() => {
        const controller = new AbortController();

        async function fetchExercises() {
            setLoading(true);
            setErrorMsg("");

            try {
                const res = await fetch(API_URL, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();

                const list = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.exercises)
                        ? data.exercises
                        : Array.isArray(data?.data)
                            ? data.data
                            : null;

                if (!list) {
                    throw new Error("Unexpected API response shape (expected an array).");
                }

                setAllExercises(list);
                setPage(0);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErrorMsg(err.message || "Failed to load exercises.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
        return () => controller.abort();
    }, []);

    // When filters change, go back to page 0
    useEffect(() => {
        setPage(0);
    }, [selectedBodyPart, selectedEquipment, selectedTarget]);

    // Filtered list
    const filteredExercises = useMemo(() => {
        return allExercises.filter((ex) => {
            const matchBody =
                selectedBodyPart === "all" || ex.bodyPart === selectedBodyPart;

            const matchEquip =
                selectedEquipment === "all" || ex.equipment === selectedEquipment;

            const matchTarget =
                selectedTarget === "all" || ex.target === selectedTarget;

            return matchBody && matchEquip && matchTarget;
        });
    }, [allExercises, selectedBodyPart, selectedEquipment, selectedTarget]);

    const totalPages = Math.max(1, Math.ceil(filteredExercises.length / pageSize));

    // Slice the current page items (keep this in Homepage)
    const pageExercises = useMemo(() => {
        const start = page * pageSize;
        return filteredExercises.slice(start, start + pageSize);
    }, [filteredExercises, page, pageSize]);

    return (
        <div className="homePage">
            <Navbar />

            <HeroHeader />

            <div className="homeSeparator" />
            <div style={{ textAlign: "center", width: "100%", fontWeight: "bold", marginTop: "10px", fontSize: "30px"}}>Explore Exercises</div>
            <main className="homeContent">
                {loading && <div className="homeStatus">Loading exercises…</div>}

                {!loading && errorMsg && (
                    <div className="homeError">
                        <div>Couldn’t load exercises: {errorMsg}</div>
                        <button
                            className="homeRetryBtn"
                            onClick={() => window.location.reload()}
                        >
                            Reload
                        </button>
                    </div>
                )}

                {!loading && !errorMsg && (
                    <>

                        <FilterBar
                            exercises={allExercises}
                            value={{
                                bodyPart: selectedBodyPart,
                                equipment: selectedEquipment,
                                target: selectedTarget,
                            }}
                            onChange={(next) => {
                                setSelectedBodyPart(next.bodyPart);
                                setSelectedEquipment(next.equipment);
                                setSelectedTarget(next.target);
                            }}
                            onClear={() => {
                                setSelectedBodyPart("all");
                                setSelectedEquipment("all");
                                setSelectedTarget("all");
                            }}
                        />


                        <ExerciseGrid
                            exercises={pageExercises}
                            onExerciseClick={(exercise) => {
                                navigate(`/exercise/${exercise.id}`);
                            }}
                        />

                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                            enableHotkeys={true}
                        />

                        <div className="homeHint">
                            Click or press <kbd>←</kbd> / <kbd>→</kbd> to change pages.
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
