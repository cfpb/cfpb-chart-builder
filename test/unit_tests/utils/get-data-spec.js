const getData = ( url, data ) => {
  jest.mock( 'xdr', () => jest.fn() );
  jest.mock( '../../../src/js/utils/session-storage', () => ( {
    getItem: () => ( { foo: 'bar' } ),
    setItem: () => ( { foo: 'bar' } ),
    removeItem: () => ( { foo: 'bar' } )
  } ) );
  // eslint-disable-next-line global-require
  return require( '../../../src/js/utils/get-data' )( url );
};

describe( 'getData', () => {

  it( 'should handle one data source', async () => {
    const data = await getData( 'http://foo.com/foo/bar', { foo: 'bar' } );
    return expect( data ).toEqual( [ { foo: 'bar' } ] );
  } );

  it( 'should handle two data sources', async () => {
    const expected = [ { foo: 'bar' }, { foo: 'bar' } ];
    const data = await getData( 'http://blah.com/foo/bar;http://sup.foo/nope', { foo: 'bar' } );
    return expect( data ).toEqual( expected );
  } );

  it( 'should handle three data sources', async () => {
    const expected = [ { foo: 'bar' }, { foo: 'bar' }, { foo: 'bar' } ];
    const data = await getData( 'http://blah.com/foo/bar;http://sup.foo/nope;http://candy.corn/snake', { foo: 'bar' } );
    return expect( data ).toEqual( expected );
  } );

} );
