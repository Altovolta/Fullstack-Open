import Alert from '@mui/material/Alert';

interface Props {
  error: string,
}

const Notification = ({ error }: Props) => {

  if (!error) {return null;}
  
  return <Alert severity="error">{error}</Alert>;
  
};

export default Notification;