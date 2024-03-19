import './SidebarChannel.scss';
import { DocumentData } from 'firebase/firestore';
import { setChannelInfo } from '../../features/channelSlice';
import { useAppDispatch } from '../../app/hooks';

type props = {
  id: string;
  channel: DocumentData;
};

const SidebarChannel = ({ id, channel }: props) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channel.channel.channelName,
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannelHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
