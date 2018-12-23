import React from 'react';
import Downshift from 'downshift';
import debounce from 'lodash.debounce';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($term: String!) {
    items(
      where: {
        OR: [{ title_contains: $term }, { description_contains: $term }]
      }
    ) {
      id
      image
      title
    }
  }
`;

class AutoComplete extends React.Component {
  state = {
    items: [],
  };

  onChange = debounce(async (e, client) => {
    if (e.target.value.length <= 3)
      return this.setState({
        items: [],
      });

    this.setState({
      loading: true,
    });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: {
        term: e.target.value,
      },
    });

    return this.setState({
      items: res.data.items,
      loading: false,
    });
  }, 350);

  render() {
    const { items, loading } = this.state;
    const { router } = this.props;
    return (
      <SearchStyles>
        <Downshift
          onChange={item => {
            router.push({
              pathname: '/item',
              query: {
                id: item.id,
              },
            });
          }}
          itemToString={item => (item === null ? '' : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search for an item',
                      id: 'search',
                      className: loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {items.map((item, index) => (
                    <DropDownItem
                      highlighted={index === highlightedIndex}
                      {...getItemProps({ item })}
                      key={item.id}
                    >
                      <img width={50} src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!items.length && inputValue.length > 3 && !loading && (
                    <DropDownItem>Nothing found for {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default withRouter(AutoComplete);
