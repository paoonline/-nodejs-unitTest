import {up, calTriangle, fetchSomeData, login} from '../function/cal'
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
    const isLoggedIn = await calindex.login()
    expect(isLoggedIn).toBe(true)
  })

  it('spyOn and custom response', async () => {
    const spy = jest.spyOn(calindex, 'fetchSomeData').mockResolvedValue('fail');
    const isLoggedIn = await calindex.login()
    expect(isLoggedIn).toBe(false)
    expect(spy).toHaveBeenCalled()
    calindex.fetchSomeData.mockRestore()
  })

  //integration test
  // it('test api 1', async () => {
  //   const res = await request(Appindex)
  //     .get('/product_list')
  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body.length).toBeGreaterThan(0)
  // })

  // it('test api 2', async () => {
  //   const res = await request(Appindex)
  //     .get('/product_listById?_id=5e0b821250cad103b54194de')
  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body.productName).toEqual('1')
  // })

})