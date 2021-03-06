import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pane, Text, Heading } from 'evergreen-ui';
import CartItem from './MPCartItem';

class Cart extends Component {
  static propTypes = {
    checkout: PropTypes.object,
    createCheckout: PropTypes.func,
    setCheckout: PropTypes.func,
    checkoutLineItemsRemove: PropTypes.func,
  };

  render() {
    const {
      cart,
      checkout,
      removeItem,
      checkoutLineItemsUpdate,
      loading,
      cartName,
      background,
      color,
    } = this.props;
    return (
      <Pane
        marginLeft="-3px"
        background={background || '#F1FAF5'}
        border="muted"
        paddingY=".7em"
        paddingX="1em"
      >
        <Pane marginBottom={10}>
          {cart ? (
            <a href={cart.webUrl} target="_blank" rel="noopener noreferrer">
              <Text size={400} fontWeight={500} color={color || '#00783E'}>
                {cartName} Cart
              </Text>
            </a>
          ) : (
            <Text size={400} fontWeight={500} color={color || '#00783E'}>
              {cartName} Cart
            </Text>
          )}
        </Pane>
        {cart && cart.lineItems && cart.lineItems.edges.length ? (
          cart.lineItems.edges.map(a => (
            <CartItem
              removeItem={removeItem ? a => removeItem(a) : undefined}
              checkoutID={cart.id}
              checkoutLineItemsUpdate={
                checkoutLineItemsUpdate
                  ? a => checkoutLineItemsUpdate(a)
                  : undefined
              }
              key={a.node.id.toString()}
              lineItem={a.node}
              loading={loading}
            />
          ))
        ) : (
          <Pane
            background="#fff"
            border="muted"
            padding={10}
            display="flex"
            justifyContent="center"
          >
            <Text size={400}>Cart is empty</Text>
          </Pane>
        )}
      </Pane>
    );
  }
}

export default Cart;
