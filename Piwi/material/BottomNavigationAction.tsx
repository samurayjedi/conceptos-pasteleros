import { useContext } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import _ from 'lodash';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Typography from './Typography';
import { BOTTOMNAVIGATION_CONTEXT } from './BottomNavigation';

export default function BottomNavigationAction(piwi: BottomNavigationAction) {
  const theme = useTheme();
  const ctx = useContext(BOTTOMNAVIGATION_CONTEXT);
  const {
    label,
    icon,
    color = 'primary',
    textColor = theme.palette.text.secondary,
    showLabel = false,
    active = false,
    children, // never used!!!
    ...props
  } = { ...ctx, ...piwi };

  return (
    <Root>
      <TouchableWithoutFeedback {...props}>
        <Wrapper>
          <Icon
            name={icon}
            size={22}
            color={active ? theme.palette[color].main : textColor}
          />
          {showLabel && (
            <Typography
              variant="subtitle2"
              color={active ? color : 'textSecondary'}
            >
              {label}
            </Typography>
          )}
        </Wrapper>
      </TouchableWithoutFeedback>
    </Root>
  );
}

const Root = styled.View({
  flex: 1,
  overflow: 'hidden',
});

const Wrapper = styled.View(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

const Icon = styled(FontAwesome)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

interface BottomNavigationAction extends TouchableWithoutFeedbackProps {
  label: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  active?: boolean;
  showLabel?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  children?: never;
}
