window.jQuery = function(selectorOrArray ){
    let elements //用const必须赋值
    if(typeof selectorOrArray==='string'){
        elements = document.querySelectorAll(selectorOrArray)
        //api 可以操作elements
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }
  
   return{
      find(selector){
       let array = []
       for(let i=0;i<elements.length;i++){
           const elements2 = Array.from(elements[i].querySelectorAll(selector))
           array = array.concat(elements2)
        }
        // const newApi = jQuery(array)
        array.oldApi = this //this就是api
        return jQuery(array)
      },
      each(fn){
          for(let i=0;i<elements.length;i++){
              fn.call(null,elements[i],i)
          }
          return this //this就是api对象
      },
      parent(){
          const array = []
          this.each((node)=>{
            if(array.indexOf(node.parentNode===-1)){
              array.push(node.parentNode)
            }
          })
          return jQuery(array)
      },
      children(){
          const array = []
          this.each((node)=>{
              array.push(...node.children) 
              //展开操作...
          })
          return jQuery(array)
      },

      print(){
        console.log(elements)
      },

        //闭包，函数访问外部变量
      addClass(className){
        for(let i=0;i<elements.length;i++){
        //   const element = elements[i]
          elements[i].classList.add(className)
        }
        return this
      },
      oldApi:selectorOrArray.oldApi,
      end(){
          return this.oldApi
      },
   }
}