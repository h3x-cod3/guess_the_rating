import { Button, Grid, Typography, Container } from "@mui/material";

export default function GenreSelect({ onSelect }) {
    return (
        <>
            <Container
                sx={{
                    width: 450,
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <Typography variant="h6"
                sx ={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 100,
                    padding: 3
                }}
                >
                    Select a Genre
                </Typography>
                <Grid container spacing={0.5}
                >
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(28)}>Action</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(12)}>Adventure</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(35)}>Comedy</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(18)}>Drama</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(14)}>Fantasy</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(27)}>Horror</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(10749)}>Romance</Button>
                    </Grid>
                    <Grid size={3}>
                        <Button size="small" onClick={() => onSelect(878)}>Sci-fi</Button>
                    </Grid>
                    <Grid size={12}>
                        <Button size="small" onClick={() => onSelect("All")}>All</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}