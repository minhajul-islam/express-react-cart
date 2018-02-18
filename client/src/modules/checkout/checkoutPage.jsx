import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Button } from 'reactstrap';
import _ from 'lodash';
import Img from './../utils/img/img';

class CheckoutPage extends Component {
  columns() {
    return [
      {
        Header: 'Image',
        id: 'image',
        accessor: el => (!_.isEmpty(el.image) ? <Img pid={el.image[0].pid} w={100} /> : ''),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Qt',
        accessor: 'qt',
      },
      {
        Header: 'Subtotal',
        accessor: 'total',
      },
      {
        Header: 'Actions',
        id: 'act',
        accessor: el => (
          <div>
            <Button
              color="link"
              size="sm"
              onClick={() => this.props.cartProductRemove(el._id)}
            >Delete
            </Button>
          </div>
        ),
      },
    ];
  }


  render() {
    return (
      <div>

        <h1>Checkout</h1>

        <ReactTable
          className="light border"
          resizable={false}
          data={this.props.cart.cart}
          columns={this.columns()}
          minRows={0}
          defaultPageSize={30}
          showPagination={this.props.cart.cart.length > 30}
        />

        {this.props.cart.totalCount}
        {this.props.cart.totalCount > 1 ? ' items' : ' item'}
        {' '}
        ${this.props.cart.totalPrice}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch => ({
  // cartVisibleToggle: () => dispatch(cartVisibleToggle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
