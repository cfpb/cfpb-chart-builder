/* global describe it */

'use strict';

require( 'jsdom-global' )();

const chai = require( 'chai' );
const mock = require( 'mock-require' );
const expect = chai.expect;
const chaiAsPromised = require( 'chai-as-promised' );

chai.use( chaiAsPromised );

const getData = ( url, data ) => {
  mock( 'xdr', ( opts, cb ) => {
    cb( { data: data } );
  } );
  mock( '../../../src/js/utils/session-storage', {
    getItem: () => ( { foo: 'bar' } ),
    setItem: () => ( { foo: 'bar' } ),
    removeItem: () => ( { foo: 'bar' } )
  } );
  return mock.reRequire( '../../../src/js/utils/get-data' )( url );
};

describe( 'getData', () => {

  it( 'should handle one data source', () => {
    const data = getData( 'http://foo.com/foo/bar', { foo: 'bar' } );
    return expect( data ).to.eventually.deep.equal( [ { foo: 'bar' } ] );
  } );

  it( 'should handle two data sources', () => {
    const expected = [ { foo: 'bar' }, { foo: 'bar' } ];
    const data = getData( 'http://blah.com/foo/bar;http://sup.foo/nope', { foo: 'bar' } );
    return expect( data ).to.eventually.deep.equal( expected );
  } );

  it( 'should handle three data sources', () => {
    const expected = [ { foo: 'bar' }, { foo: 'bar' }, { foo: 'bar' } ];
    const data = getData( 'http://blah.com/foo/bar;http://sup.foo/nope;http://candy.corn/snake', { foo: 'bar' } );
    return expect( data ).to.eventually.deep.equal( expected );
  } );

} );
