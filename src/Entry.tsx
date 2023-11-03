import { Image, ImageSourcePropType, View } from 'react-native';
import _ from 'lodash';
import styled from '@emotion/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Typography from '../Piwi/material/Typography';
import Button from '../Piwi/material/Button';
import IconButton from '../Piwi/material/IconButton';

export default function Entry({
  image,
  title,
  author,
  rating,
  categories,
}: EntryProps) {
  return (
    <EntryRoot>
      <EntryImage source={image} />
      <EntryContent>
        <View>
          <Title variant="h5">{title}</Title>
          <Typography variant="subtitle1" color="textSecondary">
            {author}
          </Typography>
        </View>
        <TitleAndAuthor>
          <FontAwesome name="star" color="#FFC300" size={14} />
          <View style={{ padding: 2 }} />
          <Typography variant="subtitle2">{rating}</Typography>
        </TitleAndAuthor>
        <Categories>
          {categories.map((category) => (
            <Category
              key={_.snakeCase(category)}
              variant="outlined"
              size="small"
            >
              {category}
            </Category>
          ))}
        </Categories>
      </EntryContent>
      <Actions>
        <IconButton>
          <FontAwesome name="eye" />
        </IconButton>
      </Actions>
    </EntryRoot>
  );
}

const EntryRoot = styled.View(({ theme }) => ({
  flexDirection: 'row',
  marginBottom: theme.spacing(1),
}));

const EntryImage = styled(Image)({
  width: 90,
  height: 115,
  objectFit: 'cover',
  borderRadius: 10,
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.grey[800],
}));

const EntryContent = styled.View(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  justifyContent: 'space-between',
}));

const TitleAndAuthor = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const Categories = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const Category = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const Actions = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
});

export interface EntryProps {
  image: ImageSourcePropType;
  title: string;
  author: string;
  rating: number;
  categories: string[];
}
