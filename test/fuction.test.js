import { up, calTriangle, fetchSomeData, login } from '../function/cal'
import calindex from '../function/cal'
import request from 'supertest'
import Appindex from '../index'

describe('test', () => {
  test('test function', () => {
    expect(up(1, 2)).toBe(3)
  })

  test('test triangle', () => {
    const cal = calTriangle(2, 2)
    expect(cal).toEqual(2);
  })

  it('should works with async', () => {
    let myMock = jest.fn()
    myMock.mockReturnValue('hello world')
    expect(myMock()).toEqual('hello world')
  })

  it('should works with jest.fn() and mockResolvedValue', async () => {
    let myMock = fetchSomeData()
    myMock = jest.fn()
    myMock.mockResolvedValue('success from mock data')
    await expect(myMock()).resolves.toEqual('success from mock data')
  })

  it('should login', async () => {
    const isLoggedIn = await login()
    expect(isLoggedIn).toBe(true)
  })

  it('spyOn and custom response', async () => {
    const spy = jest.spyOn(calindex, 'fetchSomeData').mockResolvedValue('fail');
    const isLoggedIn = await calindex.login()
    expect(isLoggedIn).toBe(false)
    expect(spy).toHaveBeenCalled()
    calindex.fetchSomeData.mockRestore()
  })

  test('mock test api', async () => {
    const mockUrl = '/product_list';
    const mockProduct = [{
      imagePath: '',
      _id: '5e0c1c7d42a16702a061c4d5',
      productName: '12',
      productModify: '2020-01-04T06:24:33.848Z',
      productQuantity: 11,
      __v: 0
    }];
    const getProduct = jest.fn((url) => mockProduct)
    expect(getProduct(mockUrl)).toBe(mockProduct)

  })

  test('test api status', async () => {
    const res_success = await request(Appindex)
      .get('/product_list?status=true')

    const res_fail = await request(Appindex)
      .get('/product_list?status=false')

    expect(res_success.statusCode).toEqual(200)
    expect(res_success.body.status).toEqual(true)
    expect(res_fail.statusCode).toEqual(400)
    expect(res_fail.body.status).toEqual(false)
  })

  // integration test
  it('test api 1', async () => {
    const res = await request(Appindex)
      .get('/product_list')
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('test api 2', async () => {
    const res = await request(Appindex)
      .get('/product_listById?_id=5e0b821250cad103b54194de')
    expect(res.statusCode).toEqual(200)
    expect(res.body.productName).toEqual('1')
  })

})