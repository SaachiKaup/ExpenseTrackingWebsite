import {React} from 'react'
import { Group } from '@visx/group'
import { Pie, Arc} from '@visx/shape'
import { Text } from '@visx/text'
import { GradientPinkBlue } from '@visx/gradient'

function PieChart() {
    const backendCategoriesHashMap = {
    'Food': '#ff0000',
    'Fuel': '#99ff33',
    'Electrical Appliances': '#ffff00',
    'Travel': '#ff00ff',
    'Stationery': '#6666ff',
    'Utilities': '#00ffff',
    'Clothing': '#ffccff',
    'Accessory': '#ff0066',
    'Entertainment': '#ffcc66',
    'Others': '#ccff99'
    }

    const expenseDataByCategory = [
    {category: 'Food', num_records: 25, total_amt: 10000},
    {category: 'Entertainment', num_records: 20, total_amt: 2500},
    {category: 'Utilities', num_records: 15, total_amt: 30000}
    ]

    const width = 400
    const half_width = width / 2

  
   
    return (
      <main>
        
        <svg width = {width} height = {width}>
          <GradientPinkBlue id="visx-pie-gradient" />
          <rect rx={14} width={width} height={width} fill="url('#visx-pie-gradient')" />
          <Group top={half_width} left={half_width}>
            {/*<Pie data = {expenseDataByCategory}
                 pieValue = {
                    data => { 
                      console.log('data total', data.total_amt)
                      data.total_amt
                    }
                    
                 }
                 startAngle={0}
                 outerRadius={half_width}
                 innerRadius = {half_width - 2}
                 padAngle={0.01}
                 cornerRadius={3}
                 fill = {"#F28F38"}
                 opacity= {1}
                 >
                 {(pie) => {
                  console.log(pie.path)
                  
                  }
                }
              </Pie>*/}
              <Pie
              outerRadius={200}
              innerRadius={198}
              >

              </Pie>
           
          
          </Group>
        </svg>

      </main>
    )
}

export default PieChart

/*
 <Arc
            data={expenseDataByCategory}
            startAngle={2}
            endAngle={6.3}
            outerRadius={20}
            innerRadius={150}
            padAngle={0}
            cornerRadius={3}
            fill={"#F25757"}
            opacity={1}
            ></Arc> */