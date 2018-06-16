import React from 'react';

const ListMyFills = ({fill={},maxRows=5})=>{
  if(fill && fill.items){

  }else{
    fill.items=  [1,2,3,4,5]
  }
  const maxHeight = (60*maxRows+32) + 'px'
  return (
    <div style={{maxHeight,overflow:'auto'}}>
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="zb-b-b bg-grey-100 text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 ">Price</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 ">Amount</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 ">Fee</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 ">Time</th>
          </tr>
        </thead>
        <tbody>
            {
              fill.items.map((item,index)=>
                <tr key={index}>
                  {
                    index%2===0 &&
                    <td className=" pl10 pr5 pt10 pb10 zb-b-b text-left align-middle color-green-500">
                      0.00015000
                    </td>
                  }
                  {
                    index%2===1 &&
                    <td className=" pl10 pr5 pt10 pb10 zb-b-b text-left align-middle color-red-500">
                      0.00015000
                    </td>
                  }
                  <td className=" pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
                    1000.0000
                  </td>
                  <td className=" pl10 pr5 pt10 pb10 zb-b-b text-right color-black-2 align-middle">
                    2.55 LRC
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className=" pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
                    06-10 10:00
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>

  )
}

export default ListMyFills
