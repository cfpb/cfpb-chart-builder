/* global describe it */

'use strict';

require( 'jsdom-global' )();

const chai = require( 'chai' );
const nock = require( 'nock' );
const expect = chai.expect;
const chaiAsPromised = require( 'chai-as-promised' );
const getData = require( '../../../src/js/utils/get-data' );

chai.use( chaiAsPromised );

describe( 'getData', () => {

  it( 'should handle one data source', () => {
    nock( 'http://foo.com' ).get( '/foo/bar' ).reply( 200, { foo: 'bar' } );
    const data = getData( 'http://foo.com/foo/bar' );
    return expect( data ).to.eventually.deep.equal( [ { foo: 'bar' } ] );
  } );

  it( 'should handle two data sources', () => {
    nock( 'http://blah.com' ).get( '/foo/bar' ).reply( 200, { pizza: 'pie' } );
    nock( 'http://sup.foo' ).get( '/nope' ).reply( 200, { ham: 'sandwich' } );
    const data = getData( 'http://blah.com/foo/bar;http://sup.foo/nope' );
    const expected = [ { pizza: 'pie' }, { ham: 'sandwich' } ];
    return expect( data ).to.eventually.deep.equal( expected );
  } );

  it( 'should handle three data sources', () => {
    nock( 'http://blah.com' ).get( '/foo/bar' ).reply( 200, { pizza: 'pie' } );
    nock( 'http://sup.foo' ).get( '/nope' ).reply( 200, { ham: 'sandwich' } );
    nock( 'http://candy.corn' ).get( '/snake' ).reply( 200, { dance: 'party' } );
    const data = getData( 'http://blah.com/foo/bar;http://sup.foo/nope;http://candy.corn/snake' );
    const expected = [ { pizza: 'pie' }, { ham: 'sandwich' }, { dance: 'party' } ];
    return expect( data ).to.eventually.deep.equal( expected );
  } );

} );
