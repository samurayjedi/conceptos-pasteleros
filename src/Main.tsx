import styled from '@emotion/native';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAssets } from 'expo-asset';
import ConceptosAppBar from './ConceptosAppBar';
import IconButton from '../Piwi/material/IconButton';
import FormControl from '../Piwi/material/FormControl';
import OutlinedInput from '../Piwi/material/OutlinedInput';
import Paper from '../Piwi/material/Paper';
import Button from '../Piwi/material/Button';
import Entry from './Entry';
import BottomNavigation from '../Piwi/material/BottomNavigation';
import BottomNavigationAction from '../Piwi/material/BottomNavigationAction';

export default function Main() {
  const [assets] = useAssets([
    require('../assets/test1.jpg'),
    require('../assets/test2.jpg'),
    require('../assets/test3.jpg'),
  ]);

  return (
    <>
      <ConceptosAppBar />
      <Root>
        <SearchContainer>
          <FormControl fullWidth>
            <OutlinedInput
              color="secondary"
              placeholder="Buscar"
              endAdornment={
                <IconButton color="#979797">
                  <FontAwesome name="search" />
                </IconButton>
              }
            />
          </FormControl>
        </SearchContainer>
        <PiwiPaper>
          <SortButtons>
            <SortButton active variant="contained" color="secondary">
              último
            </SortButton>
            <View style={{ padding: 5 }} />
            <SortButton variant="contained" color="secondary">
              Popular
            </SortButton>
            <View style={{ padding: 5 }} />
            <SortButton variant="contained" color="secondary">
              Rating
            </SortButton>
          </SortButtons>
          <Scroll overScrollMode="never">
            {assets && (
              <>
                {assets[0] && (
                  <Entry
                    image={{ uri: assets[0].uri }}
                    title="Tarta de Fresa"
                    author="Por: Fernando Teran"
                    rating={4.7}
                    categories={['Tartas', 'Dulces']}
                  />
                )}
                {assets[1] && (
                  <Entry
                    image={{ uri: assets[1].uri }}
                    title="Pastel de Queso"
                    author="Por: Fernando Teran"
                    rating={4.9}
                    categories={['Tortas', 'Queso']}
                  />
                )}
                {assets[2] && (
                  <Entry
                    image={{ uri: assets[2].uri }}
                    title="Postre Fresa"
                    author="Por: Fernando Teran"
                    rating={4.2}
                    categories={['Postres', 'Fresas']}
                  />
                )}
              </>
            )}
            <View style={{ paddingTop: 10 }} />
          </Scroll>
        </PiwiPaper>
        <BottomNavigation color="secondary" showLabel={false}>
          <BottomNavigationAction label="Forms" icon="newspaper-o" active />
          <BottomNavigationAction label="History" icon="clock-o" />
          <BottomNavigationAction label="Metrics" icon="heart" />
          <BottomNavigationAction label="Cuenta" icon="id-badge" />
        </BottomNavigation>
      </Root>
    </>
  );
}

const Root = styled.View(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  flex: 1,
}));

const SearchContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
}));

const PiwiPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  top: 15,
  borderRadius: 0,
  borderTopLeftRadius: 30,
  flex: 1,
  alignItems: 'stretch',
  padding: 0,
  paddingTop: 30,
}));

const Scroll = styled.ScrollView(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

const SortButtons = styled.View(({ theme }) => ({
  position: 'absolute',
  top: -20,
  flexDirection: 'row',
  alignItems: 'flex-end',
  alignSelf: 'center',
}));

const SortButton = styled(Button)<{ active?: boolean }>(
  ({ theme, active = false }) => ({
    ...(!active && {
      backgroundColor: `${theme.palette.secondary.main}CC`,
      color: theme.palette.grey['300'],
    }),
  }),
);
