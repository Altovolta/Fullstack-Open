import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import { Box, Typography } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDiagnosisDetails } from "./utils";

interface Props {
  entry: HealthCheckEntry,
  diagnosisCodes: Diagnosis[]
}

const HealthCheckComponent = ({ entry, diagnosisCodes }: Props) => {

  const getRatingIcon = (rating: HealthCheckRating) => {
    let color = 'red';

    if (rating === 0) {
      color = "green";
    } else if (rating < 2) {
      color = "orange";
    }
    return <FavoriteIcon style={{ color}}  />;
  };


  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {entry.date}
      </Typography>
      <MonitorHeartIcon />
      {getRatingIcon(entry.healthCheckRating)}
      <Typography variant="subtitle1" >
        {entry.description}
      </Typography>
      { entry.diagnosisCodes ? getDiagnosisDetails({entry, diagnosisCodes}) : null }
      <Typography variant="subtitle1"  >
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );

};

export default HealthCheckComponent;