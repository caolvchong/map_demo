import React, { Component } from 'react'
import echarts from 'echarts'
import cloneDeep from 'lodash/cloneDeep'
import chaoyangJson from '../static/mapJson/chaoyang.json'
import starImg from '../static/image/star.png'


const geoCoordMap = {
  '北京市陈经纶中学':[116.454686,39.927223],
  '北京朝阳凯文学校':[116.592606,39.98835],
  '京西学校':[116.522699,40.029962],
  '北京乐成国际学校':[116.48128,39.903287],
  '教委': [116.409017, 39.972448]
}

const data = [
  {name:'北京市陈经纶中学', value: 29},
  {name:'北京朝阳凯文学校', value: 23},
  {name:'京西学校', value: 137},
  {name:'北京乐成国际学校', value: 165}
]

const data1 = [
  {name:'北京市陈经纶中学', value: 29}
]

const jiaowei = [
  {name:'教委'}
]

const convertData = function (data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}


export default class ScreenDemo extends Component {
  option = {
    tooltip : {
      trigger : 'item'
    },
    backgroundColor: '#fff',
    geo: {
      map: 'chaoyang',
      show: true
    },
    series : [
      { type: 'map',
        map: 'chaoyang',
        name: '朝阳区',
        itemStyle: {
          areaColor: 'rgb(19, 33, 73)',
          shadowBlur: 5,
          shadowColor: 'rgb(19, 56, 121)',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          borderColor: 'rgb(28, 65, 144)', // 描边颜色
          borderWidth: 2 //描边宽度
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgb(19, 33, 73)'
          },
          label: {
            show: false
          }
        },
        tooltip: {
          show: false
        }
      },
      {
        name: '学校tooltip',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 1,
        zlevel: 6,
        data: convertData(data),
        tooltip: {
          formatter: params => {
            const { name, value } = params
            return `${name}</br>学生: ${value[2]}人`
          }
        }
      },
      {
        name: '学校气泡点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 20,
        itemStyle: {
          normal: {
            color: 'rgb(44, 248, 249)' //标志颜色
          }
        },
        label: {
          show: true,
          color: '#000',
          formatter: params => {
            const { name } = params
            const index = data.findIndex(item => item.name === name) || 0
            return index + 1
          }
        },
        zlevel: 6,
        data: convertData(data),
        tooltip: {
          formatter: params => {
            const { name, value } = params
            return `${name}</br>学生: ${value[2]}人`
          }
        }
      },
      {
        name: '学校涟漪点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: 'rgb(44, 248, 249)'//标志颜色
          }
        },
        rippleEffect: { //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        zlevel: 1,
        data: convertData(data),
        tooltip: {
          formatter: params => {
            const { name, value } = params
            return `${name}</br>学生: ${value[2]}人`
          }
        }
      },
      {
        name: '显示学校气泡点',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: 30,
        itemStyle: {
          normal: {
            color: 'rgb(252, 214, 1)' //标志颜色
          }
        },
        label: {
          show: true,
          color: '#000',
          formatter: params => {
            const { name } = params
            const index = data.findIndex(item => item.name === name) || 0
            return index + 1
          }
        },
        zlevel: 7,
        data: convertData(data1),
        tooltip: {
          formatter: params => {
            const { name, value } = params
            return `${name}</br>学生: ${value[2]}人`
          }
        }
      },
      {
        name: '显示学校涟漪点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 10,
        itemStyle: {
          normal: {
            color: 'rgb(252, 214, 1)' //标志颜色
          }
        },
        rippleEffect: { //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        zlevel: 2,
        data: convertData(data1),
        tooltip: {
          formatter: params => {
            const { name, value } = params
            return `${name}</br>学生: ${value[2]}人`
          }
        }
      },
      {
        name: '教委',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: `image://${starImg}`,
        symbolSize: 20,
        itemStyle: {
          normal: {
            color: 'rgb(44, 248, 249)' //标志颜色
          }
        },
        label: {
          show: true,
          color: '#fff',
          formatter: '教委',
          position: 'right'
        },
        zlevel: 6,
        data: convertData(jiaowei),
        tooltip: {
          show: false
        }
      },
      {
        name: '发送信息',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 5 //图标大小
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: .3, //尾迹线条曲直度
            color: 'rgb(252, 214, 1)'
          }
        },
        data: []
      }
    ]
  }
  carousel = null
  myCharts = null
  index = 0
  componentDidMount () {
    echarts.registerMap('chaoyang', chaoyangJson)
    this.myCharts = echarts.init(document.getElementById('demo'))
    this.myCharts.setOption(this.option)
    this.carousel = setInterval(() => {
      const _data = cloneDeep(data)
      const showData = _data.splice(this.index, 1)
      // TODO 暂时先去除掉这块 具体原因还没有排查出为什么
      /* this.option.series[2].data = convertData(_data)
      this.option.series[3].data = convertData(_data) */
      this.option.series[4].data = convertData(showData)
      this.option.series[5].data = convertData(showData)
      this.myCharts.setOption(this.option)
      this.myCharts.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: this.index
      })
      this.index++
      if(this.index >= data.length) {
        this.index = 0
      }
    }, 2000)
    this.myCharts.on('click', series => {
      const { seriesName } = series
      if(seriesName === '学校气泡点') {
        const { data: showData } = series
        clearInterval(this.carousel)
        this.carousel = null
        // TODO 暂时先去除掉这块 具体原因还没有排查出为什么
        /* const _data = data.filter(item => item.name !== showData.name)
        this.option.series[2].data = convertData(_data)
        this.option.series[3].data = convertData(_data) */
        this.option.series[4].data = convertData([showData])
        this.option.series[5].data = convertData([showData])
        this.myCharts.setOption(this.option)
      } else {
        if(this.carousel === null) {
          this.index = 0
          this.carousel = setInterval(() => {
            const _data = cloneDeep(data)
            const showData = _data.splice(this.index, 1)
            // TODO 暂时先去除掉这块 具体原因还没有排查出为什么
            /* this.option.series[2].data = convertData(_data)
            this.option.series[3].data = convertData(_data) */
            this.option.series[4].data = convertData(showData)
            this.option.series[5].data = convertData(showData)
            this.myCharts.setOption(this.option)
            this.myCharts.dispatchAction({
              type: 'showTip',
              seriesIndex: 1,
              dataIndex: this.index
            })
            this.index++
            if(this.index >= data.length) {
              this.index = 0
            }
          }, 2000)
        }
      }
    })
  }

  componentWillUnmount () {
    clearInterval(this.carousel)
    this.carousel = null
  }

  clickSend = () => {
    this.option.series[7].data = [
      [{coord: [116.454686,39.927223]}, {coord: [116.409017, 39.972448]}]
    ]
    this.myCharts && this.myCharts.setOption(this.option)
    setTimeout(() => {
      this.option.series[7].data = []
      this.myCharts && this.myCharts.setOption(this.option)
    }, 10000)
  }

  render () {
    return <div>
      <button onClick={this.clickSend}>发送效果</button>
      <div id="demo" style={{ height: '800px' }}></div>
    </div>
  }
}
