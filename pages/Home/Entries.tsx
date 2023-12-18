import React, { useCallback, useContext } from 'react';
import styled from '@emotion/native';
import _ from 'lodash';
import { useAssets } from 'expo-asset';
import { View, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CTX } from '.';
import FormControl from '../../Piwi/material/FormControl';
import OutlinedInput from '../../Piwi/material/OutlinedInput';
import IconButton from '../../Piwi/material/IconButton';
import Entry, { EntryProps } from './Entry';
import Paper from '../../Piwi/material/Paper';
import Button from '../../Piwi/material/Button';

export default function Entries() {
  const { setActiveEntry } = useContext(CTX);
  const [assets] = useAssets([
    require('../../assets/test1.jpg'),
    require('../../assets/test2.jpg'),
    require('../../assets/test3.jpg'),
    require('../../assets/test4.jpg'),
    require('../../assets/test5.jpg'),
    require('../../assets/test6.jpg'),
  ]);
  const data: Omit<EntryProps, 'onOpen' | 'onClose' | 'image' | 'index'>[] = [
    {
      title: 'Tarta de Fresa',
      author: 'Por: Fernando Teran',
      rating: 4.7,
      views: 2200,
      categories: ['Básicas'],
    },
    {
      title: 'Pastel de Queso',
      author: 'Por: Fernando Teran',
      rating: 4.3,
      views: 1200,
      categories: ['Básicas'],
      isPremium: true,
      price: 12,
    },
    {
      title: 'Postre Fresa',
      author: 'Por: Fernando Teran',
      rating: 4.9,
      views: 4200,
      categories: ['Básicas'],
    },
    {
      title: 'Glaseado Chocolate',
      author: 'Por: Fernando Teran',
      rating: 5.0,
      views: 3200,
      categories: ['Básicas'],
    },
    {
      title: 'Azerbaiyán',
      author: 'Por: Fernando Teran',
      rating: 4.1,
      views: 5000,
      categories: ['Básicas'],
    },
    {
      title: 'Torta Chocolate',
      author: 'Por: Fernando Teran',
      rating: 4.0,
      views: 12000,
      categories: ['Básicas'],
    },
  ];

  const onOpen = useCallback(() => setActiveEntry(true), []);
  const onClose = useCallback(() => setActiveEntry(false), []);

  return (
    <>
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
            Básicas
          </SortButton>
          <View style={{ padding: 5 }} />
          <SortButton variant="contained" color="secondary">
            Clásicas
          </SortButton>
          <View style={{ padding: 5 }} />
          <SortButton variant="contained" color="secondary">
            Gourmet
          </SortButton>
        </SortButtons>
        {assets && (
          <>
            <View style={{ padding: 6 }} />
            <ScrollView overScrollMode="never">
              {data.map((entry, index) => (
                <Entry
                  {...entry}
                  key={_.snakeCase(entry.title)}
                  image={{ uri: assets[index].uri }}
                  index={index}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              ))}
            </ScrollView>
            <View style={{ paddingTop: 10 }} />
          </>
        )}
      </PiwiPaper>
    </>
  );
}

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
