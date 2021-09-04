import React from "react";
import "../../styles.css";

const List = ({ arr }) => {  
  console.log(arr);
  return(
    <div className='list_component'>
      <div className='padding'>
        {arr.map((item, i) => (    
          <>
            {i % 2 === 0 && 
              <li key={i} className='list_item_pink'>
                <div className='list_item_component'>
                  {item.groupName && <div className='group_name'>
                    <text style={{marginLeft: `${item.margin * 16}px`}}>{item.groupName}</text>
                  </div>}
                  <div className='unit_component'>
                    <div className='name'>
                      <text style={{marginLeft: `${item.margin * 16}px`}}>{item.name}</text>
                    </div>
                    <div>
                      <text>{item.value}</text>
                    </div>
                  </div>
                </div>
              </li>
            }
            {i % 2 !== 0 && 
              <li key={i} className='list_item_white'>
                <div className='list_item_component'>
                  {item.groupName && <div className='group_name'>
                    <text style={{marginLeft: `${item.margin * 16}px`}}>{item.groupName}</text>
                  </div>}
                  <div className='unit_component'>
                    <div className='name'>
                      <text style={{marginLeft: `${item.margin * 16}px`}}>{item.name}</text>
                    </div>
                    <div>
                      <text>{item.value}</text>
                    </div>
                  </div>
                </div>
              </li>
            }
          </>
          ))}
      </div>
    </div>
  );
}

export default List;