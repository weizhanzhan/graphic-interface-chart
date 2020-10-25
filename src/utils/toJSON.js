/**
 * 
 * @param {Object | Array} option 
 * @param {number} index 循环的层级
 * @param {number} end 判断每一层级别是否是最后一个层级，判断需不需要加逗号
 */
function toJSON(option,index = 0,end = true){
  if(typeof option !== 'object') return
  const optionIsArray = option instanceof Array
  const startType = optionIsArray?'[':'{'
  const endType = optionIsArray?']':'}'
  let space = ''
  const baseSpace = '    '
  let spaceIndex = index
  while(spaceIndex>0){
    space+= baseSpace
    spaceIndex--
  }

  let template = `${startType} \n`
  const keys = Object.keys(option)

  if(optionIsArray){
    for(let i = 0 ;i<option.length;i++){
      const value = option[i]
      const valueType = typeof value

      if(valueType !== 'object'){
        template+= `${baseSpace}${space}${`'${value}'`} \n`
      }else if(value instanceof Array){
        const isBaseData = value.every(item=>typeof item !== 'object')
        if(isBaseData){
          template+= `${baseSpace}${space}${JSON.stringify(value)} \n`
        }else{
          template+= `${baseSpace}${space}${toJSON(value,index+1,i===option.length -1 )}`
        }  
      }else{
        template+=  `${baseSpace}${space}${toJSON(value,index+1,i===option.length -1)}`
      }
    }
   
  }else{
    for(let i = 0 ;i<keys.length;i++){
      const key = keys[i]
      const value = option[key]
      const valueType = typeof value
    
      if(valueType !== 'object'){
        template+= `${baseSpace}${space}${keys[i]}:${`'${value}'`}${(i=== keys.length - 1) ? '':','} \n`
      }else if(value instanceof Array){
        const isBaseData = value.every(item=>typeof item !== 'object')
        if(isBaseData){
          template+= `${baseSpace}${space}${keys[i]}:${JSON.stringify(value)} \n`
        }else{
          template+= `${baseSpace}${space}${keys[i]}:${toJSON(value,index+1,i===keys.length -1)}`
        }
      }else{
        template+=  `${baseSpace}${space}${keys[i]}:${toJSON(value,index+1,i===keys.length -1)}`
      }
      
    }
    
  }
  template+=`${space}${endType}${(end) ? '':','} \n`
  return template
}
export { toJSON }

