import React, { useCallback } from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppDispatch } from '../../src/hooks';
import { changeContent } from '../../store/appbar';
import Typography from '../../Piwi/material/Typography';
import { parseThousands } from '../../Piwi/root/utils';
import Crown from '../../Piwi/icons/crown';
import IconButton from '../../Piwi/material/IconButton';

export default function Entry({
  onOpen = () => {},
  onClose = () => {},
  ...props
}: EntryProps) {
  const {
    image,
    title,
    author,
    rating,
    views,
    categories,
    borderBottom = true,
    isPremium = false,
    price,
  } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const onPressIn = useCallback(() => {
    dispatch(changeContent({ el: EntryAppBar, props: { title, onClose } }));
    onOpen(props);
  }, [props]);

  return (
    <EntryRoot borderBottom={borderBottom}>
      <EntryImage source={image} />
      <EntryContent>
        <Typography variant="h5" color="secondary" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" fontWeight="bold">
          {author}
        </Typography>
        <Metrics>
          {isPremium && (
            <PiwiMetric>
              <CrownIcon color={theme.palette.secondary.main} />
              <Typography variant="subtitle2">{price}$</Typography>
            </PiwiMetric>
          )}
          <Metric icon="eye" label={parseThousands(views)} />
          <Metric icon="star" label={String(rating)} />
          <Categories categories={categories} />
        </Metrics>
      </EntryContent>
      <Actions>
        <IconButton onPressIn={onPressIn}>
          <FontAwesome name="sign-in" />
        </IconButton>
      </Actions>
    </EntryRoot>
  );
}

function EntryAppBar({
  title,
  onClose,
}: {
  title: string;
  onClose: NonNullable<EntryProps['onClose']>;
}) {
  const dispatch = useAppDispatch();
  const back = useCallback(() => {
    dispatch(changeContent(null));
    onClose();
  }, []);

  return (
    <>
      <IconButton color="#ffffff" onPress={back}>
        <FontAwesome name="arrow-left" />
      </IconButton>
      <Typography variant="h6" style={{ color: 'white' }}>
        {title}
      </Typography>
    </>
  );
}

const EntryRoot = styled.View<{ borderBottom: boolean }>(
  ({ theme, borderBottom }) => ({
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    ...(borderBottom && {
      borderBottomWidth: 1,
      borderBottomColor: theme.palette.divider,
      paddingBottom: theme.spacing(1),
    }),
  }),
);

const EntryImage = styled(Image)({
  width: 70,
  height: 70,
  objectFit: 'cover',
  borderRadius: 5,
});

const EntryContent = styled.View(({ theme }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: 12,
  paddingBottom: theme.spacing(1),
}));

const Metrics = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 2,
});

const PiwiMetric = styled.View(({ theme }) => ({
  paddingRight: 8,
  flexDirection: 'row',
  alignItems: 'center',
}));

const MetricIcon = styled(FontAwesome)(({ theme }) => ({
  paddingRight: 3,
}));

const CrownIcon = styled(Crown)({
  paddingRight: 3,
});

const Actions = styled.View({
  flex: 1,
  alignItems: 'flex-end',
  justifyContent: 'center',
});

function Metric({ icon, label }: MetricProps) {
  const theme = useTheme();
  return (
    <PiwiMetric>
      <MetricIcon name={icon} color={theme.palette.secondary.main} size={14} />
      <Typography variant="subtitle2">{label}</Typography>
    </PiwiMetric>
  );
}

function Categories({ categories }: { categories: string[] }) {
  return (
    <Typography variant="subtitle2" color="disabled" fontWeight="bold">
      #{categories.join(', #')}
    </Typography>
  );
}

export interface EntryProps {
  index: number;
  image: ImageSourcePropType;
  title: string;
  author: string;
  isPremium?: boolean;
  price?: number;
  rating: number;
  views: number;
  categories: string[];
  borderBottom?: boolean;
  onOpen?: (entry: EntryOpenEv) => void;
  onClose?: () => void;
}

export type EntryOpenEv = Omit<EntryProps, 'onOpen' | 'onClose'>;

interface MetricProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
}
