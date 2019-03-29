fakeData()

function Model(options){
  this.data = options.data
  this.resource = options.resource
}

Model.prototype.fetch = function(id){
  return axios.get(`/${this.resource}s/${id}`).then((response)=>{
      this.data = response.data
      return response
    })
}
Model.prototype.updata = function(data){
  let id =this.data.id
    
    return axios.put(`/${this.resource}s/${id}`,data).then((response)=>{      
      this.data = response.data
         
      return response
    })
}



/*-------------------*/
let model = new Model({
  data:{
    name:'',
    number:0,
    id:''
  },
  resource: 'book'
})


let view=new Vue({
  el:'#app',
  data:{
    book:{
      name:'未命名',
      number:0,
      id:''
   },
   n:1
  },
  template:`
    <div>     
        <div>
          书名：《{{book.name}}》
          数量：<span id="number">{{book.number}}</span>
        </div>
        <div>
            <input v-model='n'/>
            N的值是：{{n}}
        </div>
      <div>
         <button v-on:click="addOne">加n</button>
         <button v-on:click="minusOne">减n</button>
         <button v-on:click="reset">清空</button>
      </div>
    </div>
  `,
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data 
    })
  }, 
  methods:{
    addOne(){
      model.updata({number:this.book.number+(this.n-0)})
        .then(()=>{
        this.view.book = this.model.data
      })   
    },
    minusOne(){
       model.updata({number:this.book.number-(this.n-0)})
        .then(()=>{
        this.view.book = this.model.data
      })
    },
    reset(){    
       model.updata({number:0})
        .then(()=>{
        this.view.book = this.model.data
      })
    }
  }
})



function fakeData(){
  let book={
    name:'JavaScript高级程序设计',
    number:2,
    id:1
  }
  //在真正返回respopnse之前拦截一下
  axios.interceptors.response.use(function(response){
    //let config = response.config
    //let {method,url,data}=config

    let{config:{method,url,data}} = response

    if(url==="/books/1" && method==='get'){
      response.data=book
      console.log(response)
    }else if(url ==="/books/1" && method === 'put') {
     
     data=JSON.parse(data)
     Object.assign(book,data)
     
     response.data = book
    }
    return response
  })
}


/*model.fetch(1).then((response)=>{
  console.log(response.data)
  let {data}=response
  view.render(data)
  
})*/


