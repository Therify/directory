import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ChannelTabs } from './ui/ChannelTabs';
import { useEffect, useState } from 'react';
import { IChannel } from '../types';
import { Channel } from './ui/Channel';

type ChannelType = 'Active' | 'Resolved' | 'All';
const TABS: ChannelType[] = ['Active', 'Resolved', 'All'];

interface ChannelListProps {
    currentChannelId?: string;
    channels: IChannel[];
    onChannelSelect: (channelId: string) => void;
}

export const ChannelList = ({
    channels,
    currentChannelId,
    onChannelSelect,
}: ChannelListProps) => {
    const [selectedTab, setSelectedTab] = useState<ChannelType>('All');
    const [filteredChannels, setFilteredChannels] =
        useState<IChannel[]>(channels);

    useEffect(() => {
        if (selectedTab === 'All') {
            setFilteredChannels(channels);
        } else {
            setFilteredChannels(
                channels.filter((channel) => {
                    if (selectedTab === 'Active') {
                        return channel.caseStatus === 'active';
                    }
                    return channel.caseStatus === 'resolved';
                })
            );
        }
    }, [selectedTab, channels]);

    return (
        <ChannelContainer>
            <Box
                sx={(theme) => ({
                    padding: theme.spacing(0, 6),
                })}
            >
                <ChannelTabs
                    tabs={TABS}
                    activeTab={selectedTab}
                    handleTabSelect={(tab) =>
                        setSelectedTab(tab as ChannelType)
                    }
                />
            </Box>
            <List>
                {filteredChannels.map((channel) => (
                    <ListItem
                        key={channel.id}
                        onClick={() => onChannelSelect(channel.id)}
                    >
                        <Channel
                            isSelected={channel.id === currentChannelId}
                            authorStatus={channel.authorStatus}
                            caseStatus={channel.caseStatus}
                            title={channel.title}
                            lastMessage={channel.lastMessage}
                            lastMessageTimestamp={channel.lastMessageTimestamp}
                            authorAvatarUrl={channel.authorAvatarUrl}
                            authorName={channel.authorName}
                            unreadMessages={channel.unreadMessages}
                        />
                    </ListItem>
                ))}
            </List>
        </ChannelContainer>
    );
};

const ChannelContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    maxWidth: '355px',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(8, 0, 0),
}));

const List = styled('ul')(({ theme }) => ({
    listStyle: 'none',
    width: '100%',
    padding: theme.spacing(0, 6),
    margin: 0,
    marginTop: theme.spacing(6),
    overflowY: 'auto',
    flex: 1,
}));

const ListItem = styled('li')(({ theme }) => ({
    padding: theme.spacing(4, 0),
    width: '100%',
    borderTop: `1px solid ${theme.palette.grey[100]}`,
}));
