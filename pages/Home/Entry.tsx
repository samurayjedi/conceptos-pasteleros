import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import { Category, Recipe } from '../../store/recipe';
import { usePage } from '../../lib/Inertia';
import { Image, View } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Typography from '../../Piwi/material/Typography';
import { parseThousands } from '../../Piwi/root/utils';
import { CtxAppBar } from '../../src/ConceptosAppBar';
import { CtxLayout } from '../../App';
import Crown from '../../Piwi/icons/crown';
import IconButton from '../../Piwi/material/IconButton';
import RecipeAppBar from './Recipe/RecipeAppBar';
import { useAppSelector } from '../../src/hooks';
import { SERVER } from '../../src/Vars';

export const ENTRY_HEIGHT = 90;
export default React.memo(
  ({
    index,
    borderBottom = true,
    onOpen = () => {},
    onClose = () => {},
  }: EntryProps) => {
    const category = useAppSelector(
      (state) => state.recipe.openedRecipeCategory,
    );
    const collections = usePage().props as unknown as {
      basics: Recipe[];
      classics: Recipe[];
      gourmet: Recipe[];
    };
    const indexTemp = useMemo(() => index, []);
    const recipe = collections[category][indexTemp];
    const theme = useTheme();
    const { setAppBar } = useContext(CtxAppBar);
    const { setBackground } = useContext(CtxLayout);

    return (
      <EntryRoot borderBottom={borderBottom}>
        <EntryImage
          source={{
            uri: `${SERVER}/getimage/image/${encodeURI(recipe.cover)}`,
          }}
        />
        <EntryContent>
          <Typography variant="subtitle1" color="secondary">
            {recipe.name}
          </Typography>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                fontWeight="bold"
              >
                Fernando Teran
              </Typography>
              <Metrics>
                {parseInt(recipe.premium, 10) === 1
                  ? true
                  : false && (
                      <PiwiMetric>
                        <CrownIcon color={theme.palette.secondary.main} />
                        <Typography variant="subtitle2">
                          {recipe.cost}$
                        </Typography>
                      </PiwiMetric>
                    )}
                <Metric icon="eye" label={parseThousands(1000)} />
                <Metric icon="star" label="5" />
                <Categories
                  categories={recipe.categories.map(
                    (category) => category.label,
                  )}
                />
              </Metrics>
            </View>
            <View style={{ flex: 1 }} />
            <IconButton
              onPressIn={() => {
                setBackground(theme.palette.secondary.main);
                setAppBar({
                  el: RecipeAppBar,
                  props: {
                    name: recipe.name,
                    onClose,
                  },
                });
                onOpen(index);
              }}
            >
              <FontAwesome name="sign-in" />
            </IconButton>
          </View>
        </EntryContent>
      </EntryRoot>
    );
  },
  _.isEqual,
);

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
    alignItems: 'center',
    height: ENTRY_HEIGHT,
    overflow: 'hidden',
  }),
);

const EntryImage = styled(Image)(({ theme }) => ({
  width: 80,
  height: 80,
  objectFit: 'cover',
  borderRadius: 200,
  marginRight: 5,
}));

const EntryContent = styled.View(({ theme }) => ({
  flex: 1,
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
  borderBottom?: boolean;
  onOpen?: (index: number) => void;
  onClose?: () => void;
}

interface MetricProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
}
