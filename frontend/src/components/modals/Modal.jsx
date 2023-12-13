import { useSelector } from 'react-redux';
import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const MyModal = () => {
  const { activeModal } = useSelector((state) => state.modal);

  if (activeModal === null) return null;
  if (activeModal === 'add') return <Add />;
  if (activeModal === 'rename') return <Rename />;
  if (activeModal === 'remove') return <Remove />;

  return null;
};

export default MyModal;
