<!--            <a-select style="width: 120px">-->
<!--              <div slot="dropdownRender" slot-scope="menu">-->
<!--                <v-nodes :vnodes="menu" />-->
<!--                <a-divider style="margin: 4px 0;" />-->
<!--                <div style="padding: 4px 8px;" @mousedown="e => e.preventDefault()">-->
<!--                  <div v-if='!isAdd' @click="isAdd=true"><a-icon type="plus" /> 新增</div>-->
<!--                  <a-input v-else ><a-icon slot="suffix" type="check" @click="addItem"/></a-input>-->
<!--                </div>-->
<!--              </div>-->
<!--              <a-select-option v-for="item in items11" :key="item" :value="item">-->
<!--                {{ item }}-->
<!--              </a-select-option>-->
<!--            </a-select>-->


<!--<template v-slot:materialTotalValueTest="props">-->
<!--  <a-input placeholder='请输入' style='width: 100%' :default-value='computedTxt(props)'/>-->
<!--</template>-->

<!--选择下拉新增-->
<!--合计自动算-->

<template>
  <j-modal
    :title="'会务安排'"
    :width="'1200px'"
    :visible="modalVisible"
    :maskClosable="false"
    @cancel="handleCancel"
  >
    <!-- 主表单区域 -->
    <!-- <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="基本信息">
        <a-form :form="form1">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item label="采购名称">
                <a-input allowClear v-decorator="['headline', { rules: [{ required: true, message: '请输入!' }], initialValue:this.basicInfo1.headline }]"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="采购日期">
                <a-date-picker placeholder='' v-decorator="['purchaseDate', { rules: [{ required: true, message: '请选择!' }], initialValue:this.basicInfo1.purchaseDate }]" style="width: 100%"></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="供应商">
                <a-select allowClear v-decorator="['provider', { rules: [{ required: true, message: '请选择!' }], initialValue:this.basicInfo1.provider }]">
                  <a-select-option value="程埔头菜市场">程埔头菜市场</a-select-option>
                  <a-select-option value="闽侯县菜市场">闽侯县菜市场</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-tab-pane>
    </a-tabs>-->

    <!-- 子表单区域 -->

    <!-- <j-editable-table
      ref="detailInfoForm"
      :columns="columns"
      :dataSource="dataSource"
      :maxHeight="300"
      :rowNumber="true"
      :rowSelection="true"
      :actionButton="true"
    >
      <template v-slot:materialName="props">
        <a-cascader
          :options="options"
          :show-search="true"
          placeholder="请选择"
          style="width: 100%"
          @change="onChangeCascader1($event, props)"
        />
      </template>
    </j-editable-table>-->

    <j-editable-table
      ref="detailInfoForm"
      :columns="columns"
      :dataSource="dataSource"
      :maxHeight="300"
      :rowNumber="true"
      :rowSelection="true"
      :actionButton="true"
    >
      <template v-slot:name="props">
        <a-select
          show-search
          v-model="nameArrange"
          @change="changeName($event, props,value)"
          :style="{width:'300px'}"
          placeholder="请选择姓名"
        >
          <a-select-option value="李霞">李霞</a-select-option>
          <a-select-option value="尤晓梅">尤晓梅</a-select-option>
          <a-select-option value="黄丽娟">黄丽娟</a-select-option>
        </a-select>
        <!-- <a-cascader
          :default-value="props.text.split('/')"
          :options="options"
          :show-search="true"
          placeholder="请选择"
          style="width: 100%"
          @change="onChangeCascader1($event, props)"
        />-->
      </template>
      <template v-slot:phone>
        <a-input v-model="phoneArrange" disabled></a-input>
      </template>
    </j-editable-table>

    <!-- 底部按钮 -->
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="reset" @click="handleReset">重置</a-button>
      <a-button key="submit" type="primary" @click="handleOk">提交</a-button>
    </template>
  </j-modal>
</template>

<script>
import JEditableTable from '@/components/jeecg/JEditableTable'
import { FormTypes } from '@/utils/JEditableTableUtil'
import moment from 'moment'

export default {
  name: 'PurInModal',
  components: {
    JEditableTable
  },

  props: {
    modalVisible: Boolean,
    basicInfo: Object
  },
  computed: {},
  // mounted() {
  //   let now = new Date()
  //   this.basicInfo1 = Object.assign({}, this.basicInfo)
  //   if (this.basicInfo1.purchaseDate) this.basicInfo1.purchaseDate = moment(this.basicInfo1.purchaseDate, 'YYYY-MM-DD')
  //   else this.basicInfo1.purchaseDate = moment(now.toLocaleDateString(), 'YYYY-MM-DD')
  //   if (!this.basicInfo1.headline) this.basicInfo1.headline = now.getMonth() + 1 + '月' + now.getDate() + '日采购单'
  //   // console.log(this.$props.basicInfo)
  //   // console.log(this.basicInfo)
  //   console.log(this.basicInfo1)
  // },
  data() {
    return {
      nameArrange: undefined,
      phoneArrange: undefined,
      options: [
        {
          value: '蔬菜类',
          label: '蔬菜类',
          children: [
            {
              value: '根茎类', //大小均匀，根茎完整，无畸形，无折断，无腐烂，干净清洁，无药物残留。
              label: '根茎类',
              children: [
                {
                  value: '萝卜',
                  label: '萝卜'
                },
                {
                  value: '胡萝卜',
                  label: '胡萝卜'
                },
                {
                  value: '水萝卜',
                  label: '水萝卜'
                },
                {
                  value: '大葱',
                  label: '大葱'
                },
                {
                  value: '圆葱',
                  label: '圆葱'
                },
                {
                  value: '莴苣',
                  label: '莴苣'
                },
                {
                  value: '大蒜',
                  label: '大蒜'
                },
                {
                  value: '大姜',
                  label: '大姜'
                },
                {
                  value: '莲藕',
                  label: '莲藕'
                },
                {
                  value: '山药',
                  label: '山药'
                },
                {
                  value: '芋头',
                  label: '芋头'
                },
                {
                  value: '土豆',
                  label: '土豆'
                },
                {
                  value: '地瓜',
                  label: '地瓜'
                }
              ]
            },
            {
              value: '花叶类', //鲜嫩，无黄叶，无烂叶，叶茎完整，花球坚实，无折断，干净清洁，无药物残留。
              label: '花叶类',
              children: [
                {
                  value: '白菜',
                  label: '白菜'
                },
                {
                  value: '大头菜',
                  label: '大头菜'
                },
                {
                  value: '菠菜',
                  label: '菠菜'
                },
                {
                  value: '油菜',
                  label: '油菜'
                },
                {
                  value: '苔菜',
                  label: '苔菜'
                },
                {
                  value: '芹菜',
                  label: '芹菜'
                },
                {
                  value: '香菜',
                  label: '香菜'
                },
                {
                  value: '韭菜',
                  label: '韭菜'
                },
                {
                  value: '蒜苗',
                  label: '蒜苗'
                },
                {
                  value: '菜花',
                  label: '菜花'
                },
                {
                  value: '西兰花',
                  label: '西兰花'
                }
              ]
            },
            {
              value: '果菜类', //菜品新鲜、果肉坚实、无折断、无腐烂、无异味、干净清洁，无药物残留。
              label: '果菜类',
              children: [
                {
                  value: '茄子',
                  label: '茄子'
                },
                {
                  value: '菜椒',
                  label: '菜椒'
                },
                {
                  value: '辣椒',
                  label: '辣椒'
                },
                {
                  value: '西红柿',
                  label: '西红柿'
                },
                {
                  value: '黄瓜',
                  label: '黄瓜'
                },
                {
                  value: '茭瓜',
                  label: '茭瓜'
                },
                {
                  value: '南瓜',
                  label: '南瓜'
                },
                {
                  value: '冬瓜',
                  label: '冬瓜'
                },
                {
                  value: '丝瓜',
                  label: '丝瓜'
                },
                {
                  value: '扁豆',
                  label: '扁豆'
                },
                {
                  value: '豆角',
                  label: '豆角'
                },
                {
                  value: '毛豆',
                  label: '毛豆'
                },
                {
                  value: '豌豆',
                  label: '豌豆'
                }
              ]
            },
            {
              value: '食用菌类', //色泽、气味正常、无发霉、朵片完整，无药物残留。
              label: '食用菌类',
              children: [
                {
                  value: '蘑菇',
                  label: '蘑菇'
                },
                {
                  value: '香菇',
                  label: '香菇'
                },
                {
                  value: '杏鲍菇',
                  label: '杏鲍菇'
                },
                {
                  value: '金针菇',
                  label: '金针菇'
                },
                {
                  value: '黑木耳',
                  label: '黑木耳'
                },
                {
                  value: '银耳',
                  label: '银耳'
                }
              ]
            }
          ]
        },
        {
          value: '肉食类',
          label: '肉食类',
          children: [
            {
              value: '猪肉类', //肉质有弹性、新鲜无异味、无淤血、无注水、无寄生虫，有《动物检疫合格证明》。
              label: '猪肉类',
              children: [
                {
                  value: '前肘肉',
                  label: '前肘肉'
                },
                {
                  value: '后肘肉',
                  label: '后肘肉'
                },
                {
                  value: '五花肉',
                  label: '五花肉'
                },
                {
                  value: '肉馅',
                  label: '肉馅'
                },
                {
                  value: '猪头',
                  label: '猪头'
                },
                {
                  value: '猪蹄',
                  label: '猪蹄'
                },
                {
                  value: '猪口条',
                  label: '猪口条'
                },
                {
                  value: '猪耳朵',
                  label: '猪耳朵'
                },
                {
                  value: '猪排骨',
                  label: '猪排骨'
                },
                {
                  value: '猪大骨',
                  label: '猪大骨'
                }
              ]
            },
            {
              value: '鸡产品类', //肉质有弹性、新鲜无异味、无淤血、无注水、无寄生虫，有《动物检疫合格证明》。
              label: '鸡产品类',
              children: [
                {
                  value: '鸡胸肉',
                  label: '鸡胸肉'
                },
                {
                  value: '鸡腿',
                  label: '鸡腿'
                },
                {
                  value: '翅肩肉',
                  label: '翅肩肉'
                },
                {
                  value: '鸡背',
                  label: '鸡背'
                },
                {
                  value: '鸡叉',
                  label: '鸡叉'
                },
                {
                  value: '翅根',
                  label: '翅根'
                },
                {
                  value: '鸡脖',
                  label: '鸡脖'
                },
                {
                  value: '鸡肝',
                  label: '鸡肝'
                },
                {
                  value: '鸡胗',
                  label: '鸡胗'
                },
                {
                  value: '鸡爪',
                  label: '鸡爪'
                },
                {
                  value: '白条',
                  label: '白条'
                },
                {
                  value: '鸡',
                  label: '鸡'
                }
              ]
            },
            {
              value: '丸滑类', //形态完整、均匀，无破损，保质保量，添加剂符合国家标准。
              label: '丸滑类',
              children: [
                {
                  value: '鸡脯丸',
                  label: '鸡脯丸'
                },
                {
                  value: '鸡柳',
                  label: '鸡柳'
                },
                {
                  value: '牛肉丸',
                  label: '牛肉丸'
                },
                {
                  value: '四喜丸',
                  label: '四喜丸'
                },
                {
                  value: '千页豆腐',
                  label: '千页豆腐'
                }
              ]
            },
            {
              value: '禽蛋类', //蛋壳干净，无破损，有《检验检测中心检验报告》。
              label: '禽蛋类',
              children: [
                {
                  value: '鸡蛋',
                  label: '鸡蛋'
                },
                {
                  value: '鸭蛋',
                  label: '鸭蛋'
                },
                {
                  value: '鹅蛋',
                  label: '鹅蛋'
                },
                {
                  value: '鸽子蛋',
                  label: '鸽子蛋'
                },
                {
                  value: '鹌鹑蛋',
                  label: '鹌鹑蛋'
                }
              ]
            }
          ]
        },
        {
          value: '粮油类',
          label: '粮油类',
          children: [
            {
              value: '原粮', //未加工
              label: '原粮',
              children: [
                {
                  value: '稻谷',
                  label: '稻谷'
                },
                {
                  value: '小麦',
                  label: '小麦'
                },
                {
                  value: '玉米',
                  label: '玉米'
                },
                {
                  value: '高粱',
                  label: '高粱'
                },
                {
                  value: '谷子',
                  label: '谷子'
                },
                {
                  value: '大麦',
                  label: '大麦'
                },
                {
                  value: '荞麦',
                  label: '荞麦'
                },
                {
                  value: '大豆',
                  label: '大豆'
                },
                {
                  value: '小豆',
                  label: '小豆'
                },
                {
                  value: '绿豆',
                  label: '绿豆'
                },
                {
                  value: '蚕豆',
                  label: '蚕豆'
                },
                {
                  value: '芸豆',
                  label: '芸豆'
                },
                {
                  value: '甘薯',
                  label: '甘薯'
                }
              ]
            },
            {
              value: '成品粮', //经加工
              label: '成品粮',
              children: [
                {
                  value: '大米',
                  label: '大米'
                },
                {
                  value: '小米',
                  label: '小米'
                },
                {
                  value: '小麦粉',
                  label: '小麦粉'
                },
                {
                  value: '油菜籽',
                  label: '油菜籽'
                },
                {
                  value: '白芝麻',
                  label: '白芝麻'
                },
                {
                  value: '黑芝麻',
                  label: '黑芝麻'
                },
                {
                  value: '棉籽',
                  label: '棉籽'
                },
                {
                  value: '葵花籽',
                  label: '葵花籽'
                },
                {
                  value: '香瓜籽',
                  label: '香瓜籽'
                },
                {
                  value: '油茶籽',
                  label: '油茶籽'
                },
                {
                  value: '棕榈籽',
                  label: '棕榈籽'
                }
              ]
            },
            {
              value: '油脂', //形态完整、均匀，无破损，保质保量，添加剂符合国家标准。
              label: '油脂',
              children: [
                {
                  value: '花生油',
                  label: '花生油'
                },
                {
                  value: '菜油',
                  label: '菜油'
                },
                {
                  value: '香油',
                  label: '香油'
                },
                {
                  value: '葵花籽油',
                  label: '葵花籽油'
                },
                {
                  value: '蓖麻籽油',
                  label: '蓖麻籽油'
                },
                {
                  value: '大豆油',
                  label: '大豆油'
                },
                {
                  value: '色拉油',
                  label: '色拉油'
                },
                {
                  value: '调味油',
                  label: '调味油'
                },
                {
                  value: '调和油',
                  label: '调和油'
                }
              ]
            },
            {
              value: '粮油制品', //形态完整、均匀，无破损，保质保量，添加剂符合国家标准。
              label: '粮油制品',
              children: [
                {
                  value: '生切面',
                  label: '生切面'
                },
                {
                  value: '挂面',
                  label: '挂面'
                },
                {
                  value: '米粉',
                  label: '米粉'
                },
                {
                  value: '豆腐',
                  label: '豆腐'
                },
                {
                  value: '豆奶',
                  label: '豆奶'
                },
                {
                  value: '面包',
                  label: '面包'
                },
                {
                  value: '烧饼',
                  label: '烧饼'
                },
                {
                  value: '汤圆',
                  label: '汤圆'
                },
                {
                  value: '面筋',
                  label: '面筋'
                },
                {
                  value: '花生酱',
                  label: '花生酱'
                }
              ]
            }
          ]
        },
        {
          value: '海鲜类',
          label: '海鲜类', //无伤残、无畸形、无病害、新鲜无变质。
          children: [
            {
              value: '鱼类',
              label: '鱼类',
              children: [
                {
                  value: '大黄鱼',
                  label: '大黄鱼'
                },
                {
                  value: '小嘴鱼',
                  label: '小嘴鱼'
                },
                {
                  value: '多宝鱼',
                  label: '多宝鱼'
                },
                {
                  value: '海黑鱼',
                  label: '海黑鱼'
                },
                {
                  value: '先生鱼',
                  label: '先生鱼'
                },
                {
                  value: '海鳝鱼',
                  label: '海鳝鱼'
                },
                {
                  value: '海鲶鱼',
                  label: '海鲶鱼'
                },
                {
                  value: '沙鱼',
                  label: '沙鱼'
                },
                {
                  value: '八爪鱼',
                  label: '八爪鱼'
                },
                {
                  value: '沙丁鱼',
                  label: '沙丁鱼'
                },
                {
                  value: '胖头鱼',
                  label: '胖头鱼'
                },
                {
                  value: '三文鱼',
                  label: '三文鱼'
                },
                {
                  value: '金枪鱼',
                  label: '金枪鱼'
                }
              ]
            },
            {
              value: '贝类',
              label: '贝类',
              children: [
                {
                  value: '柽子王',
                  label: '柽子王'
                },
                {
                  value: '大海螺',
                  label: '大海螺'
                },
                {
                  value: '小海鲜',
                  label: '小海鲜'
                },
                {
                  value: '蝴蝶贝',
                  label: '蝴蝶贝'
                },
                {
                  value: '海蛎壳',
                  label: '海蛎壳'
                },
                {
                  value: '象拔蚌',
                  label: '象拔蚌'
                },
                {
                  value: '花螺',
                  label: '花螺'
                },
                {
                  value: '北极贝',
                  label: '北极贝'
                },
                {
                  value: '龙眼贝',
                  label: '龙眼贝'
                },
                {
                  value: '麻蚬子',
                  label: '麻蚬子'
                }
              ]
            },
            {
              value: '虾类',
              label: '虾类',
              children: [
                {
                  value: '龙虾',
                  label: '龙虾'
                },
                {
                  value: '基围虾',
                  label: '基围虾'
                },
                {
                  value: '皮皮虾',
                  label: '皮皮虾'
                },
                {
                  value: '青虾',
                  label: '青虾'
                },
                {
                  value: '大海虾',
                  label: '大海虾'
                },
                {
                  value: '小河虾',
                  label: '小河虾'
                },
                {
                  value: '小红虾',
                  label: '小红虾'
                }
              ]
            },
            {
              value: '海藻类',
              label: '海藻类',
              children: [
                {
                  value: '发菜',
                  label: '发菜'
                },
                {
                  value: '紫菜',
                  label: '紫菜'
                },
                {
                  value: '海带',
                  label: '海带'
                },
                {
                  value: '海白菜',
                  label: '海白菜'
                },
                {
                  value: '裙带菜',
                  label: '裙带菜'
                }
              ]
            }
          ]
        },
        {
          value: '水果类',
          label: '水果类', //果形端正、大小均匀、色泽正常、无腐烂、无异味、干净清洁，无药物残留。
          children: [
            {
              value: '瓜类',
              label: '瓜类',
              children: [
                {
                  value: '西瓜',
                  label: '西瓜'
                },
                {
                  value: '哈密瓜',
                  label: '哈密瓜'
                },
                {
                  value: '香瓜',
                  label: '香瓜'
                },
                {
                  value: '木瓜',
                  label: '木瓜'
                }
              ]
            },
            {
              value: '蕉类',
              label: '蕉类',
              children: [
                {
                  value: '香蕉',
                  label: '香蕉'
                },
                {
                  value: '芭蕉',
                  label: '芭蕉'
                },
                {
                  value: '大蕉',
                  label: '大蕉'
                },
                {
                  value: '红香蕉',
                  label: '红香蕉'
                },
                {
                  value: '皇帝蕉',
                  label: '皇帝蕉'
                }
              ]
            },
            {
              value: '桃类',
              label: '桃类',
              children: [
                {
                  value: '猕猴桃',
                  label: '猕猴桃'
                },
                {
                  value: '水蜜桃',
                  label: '水蜜桃'
                },
                {
                  value: '黄桃',
                  label: '黄桃'
                },
                {
                  value: '杨桃',
                  label: '杨桃'
                },
                {
                  value: '油桃',
                  label: '油桃'
                }
              ]
            },
            {
              value: '果类',
              label: '果类',
              children: [
                {
                  value: '苹果',
                  label: '苹果'
                },
                {
                  value: '无花果',
                  label: '无花果'
                },
                {
                  value: '芒果',
                  label: '芒果'
                },
                {
                  value: '蔷薇果',
                  label: '蔷薇果'
                }
              ]
            },
            {
              value: '葡萄类',
              label: '葡萄类',
              children: [
                {
                  value: '葡萄',
                  label: '葡萄'
                },
                {
                  value: '提子',
                  label: '提子'
                },
                {
                  value: '醋栗',
                  label: '醋栗'
                }
              ]
            },
            {
              value: '柑类',
              label: '柑类',
              children: [
                {
                  value: '橘子',
                  label: '橘子'
                },
                {
                  value: '柚子',
                  label: '柚子'
                },
                {
                  value: '橙子',
                  label: '橙子'
                },
                {
                  value: '砂甜桔',
                  label: '砂甜桔'
                }
              ]
            }
          ]
        },
        {
          value: '面食类',
          label: '面食类', //形态完整，美观，无霉点，无使用色素及非食用添加剂，口味适中。
          children: [
            {
              value: '馒头',
              label: '馒头',
              children: [
                {
                  value: '牛奶馒头',
                  label: '牛奶馒头'
                },
                {
                  value: '戗面馒头',
                  label: '戗面馒头'
                },
                {
                  value: '白面馒头',
                  label: '白面馒头'
                },
                {
                  value: '杂粮馒头',
                  label: '杂粮馒头'
                }
              ]
            },
            {
              value: '花卷',
              label: '花卷',
              children: [
                {
                  value: '椒盐花卷',
                  label: '椒盐花卷'
                },
                {
                  value: '麻酱花卷',
                  label: '麻酱花卷'
                },
                {
                  value: '葱油花卷',
                  label: '葱油花卷'
                }
              ]
            },
            {
              value: '面条',
              label: '面条',
              children: [
                {
                  value: '刀削面',
                  label: '刀削面'
                },
                {
                  value: '焖面',
                  label: '焖面'
                },
                {
                  value: '油泼面',
                  label: '油泼面'
                },
                {
                  value: '饸饹',
                  label: '饸饹'
                },
                {
                  value: '剔尖',
                  label: '剔尖'
                },
                {
                  value: '炸酱面',
                  label: '炸酱面'
                },
                {
                  value: '龙须面',
                  label: '龙须面'
                },
                {
                  value: '清汤牛肉面',
                  label: '清汤牛肉面'
                }
              ]
            },
            {
              value: '饺子',
              label: '饺子',
              children: [
                {
                  value: '蒸饺',
                  label: '蒸饺'
                },
                {
                  value: '煎饺',
                  label: '煎饺'
                },
                {
                  value: '汤饺',
                  label: '汤饺'
                },
                {
                  value: '锅贴饺子',
                  label: '锅贴饺子'
                },
                {
                  value: '炸饺子',
                  label: '炸饺子'
                },
                {
                  value: '生饺子',
                  label: '生饺子'
                }
              ]
            },
            {
              value: '包子',
              label: '包子',
              children: [
                {
                  value: '灌汤包子',
                  label: '灌汤包子'
                },
                {
                  value: '蒸包子',
                  label: '蒸包子'
                },
                {
                  value: '烤包子',
                  label: '烤包子'
                },
                {
                  value: '叉烧包',
                  label: '叉烧包'
                },
                {
                  value: '糖三角',
                  label: '糖三角'
                },
                {
                  value: '水煎包',
                  label: '水煎包'
                }
              ]
            }
          ]
        },
        {
          value: '酒水类',
          label: '酒水类', //货真价实，无假货，无过期产品。
          children: [
            {
              value: '蒸馏酒',
              label: '蒸馏酒',
              children: [
                {
                  value: '白酒',
                  label: '白酒'
                },
                {
                  value: '白兰地',
                  label: '白兰地'
                },
                {
                  value: '威士忌',
                  label: '威士忌'
                },
                {
                  value: '伏特加',
                  label: '伏特加'
                },
                {
                  value: '兰姆酒',
                  label: '兰姆酒'
                },
                {
                  value: '阿拉克酒',
                  label: '阿拉克酒'
                }
              ]
            },
            {
              value: '发酵酒',
              label: '发酵酒',
              children: [
                {
                  value: '黄酒',
                  label: '黄酒'
                },
                {
                  value: '啤酒',
                  label: '啤酒'
                },
                {
                  value: '葡萄酒',
                  label: '葡萄酒'
                },
                {
                  value: '果子酒',
                  label: '果子酒'
                }
              ]
            },
            {
              value: '配制酒',
              label: '配制酒',
              children: [
                {
                  value: '露酒',
                  label: '露酒'
                },
                {
                  value: '香槟酒',
                  label: '香槟酒'
                },
                {
                  value: '汽酒',
                  label: '汽酒'
                },
                {
                  value: '药酒',
                  label: '药酒'
                },
                {
                  value: '滋补酒',
                  label: '滋补酒'
                }
              ]
            }
          ]
        }
      ],
      basicInfo1: {},
      isAdd: false,
      items11: ['jack', 'lucy'],
      form1: this.$form.createForm(this),
      basicInfoForm: {},
      detailsInfoForm: {},
      dataSource: [],
      // dataSource1: [
      //   {
      //     key: 1,
      //     materialName: ['粮油类/原粮/稻谷'],
      //     materialCategory: '肉类',
      //     materialUnits: 'kg',
      //     materialPrice: '10.00',
      //     materialNum: '10',
      //     materialTotalValue: '100.00'
      //   },
      //   {
      //     id: '2',
      //     materialName: ['粮油类/原粮/稻谷'],
      //     materialCategory: '肉类',
      //     materialUnits: 'kg',
      //     materialPrice: '10.00',
      //     materialNum: '10',
      //     materialTotalValue: '100.00'
      //   }
      // ],
      columns: [
        // {
        //   title: '姓名',
        //   key: 'name',
        //   type: FormTypes.select,
        //   placeholder: '请选择${title}',
        //   validateRules: [{ required: true, message: '${title}不能为空' }],
        //   options: [
        //     { title: '李晓霞', value: '李晓霞' },
        //     { title: '林志项', value: '林志项' },
        //     { title: '于孟浩', value: '于孟浩' }
        //   ]
        // },
        {
          title: '姓名',
          key: 'name',
          type: FormTypes.slot,
          placeholder: '请选择${title}',
          validateRules: [{ required: true, message: '${title}不能为空' }]
          // options: [
          //   { title: '李晓霞', value: '李晓霞' },
          //   { title: '林志项', value: '林志项' },
          //   { title: '于孟浩', value: '于孟浩' }
          // ]
        },
        {
          title: '联系电话',
          key: 'phone',
          type: FormTypes.slot,
          validateRules: [{ required: true, message: '${title}不能为空' }],
          slotName: 'phone',
          width: '25%'
        },

        {
          title: '安排事项',
          key: 'matters',
          type: FormTypes.input_pop,
          placeholder: '请输入${title}',
          validateRules: [{ required: true, message: '${title}不能为空' }]
        }
        // {
        //   title: '采购数量',
        //   key: 'materialNum',
        //   type: FormTypes.inputNumber,
        //   placeholder: '请输入${title}',
        //   validateRules: [{ required: true, message: '${title}不能为空' }],
        //   statistics: 'true'
        // },
        // {
        //   title: '合计(元)',
        //   key: 'materialTotalValue',
        //   type: FormTypes.inputNumber,
        //   placeholder: '请输入${title}',
        //   validateRules: [{ required: true, message: '${title}不能为空' }],
        //   statistics: 'true'
        // }
      ]
      // tempCascaderValue: ''
    }
  },
  methods: {
    // onChangeCascader1(value, props) {
    //   console.log(value)
    //   console.log(props)
    //   console.log(props.getValue())
    //   let { rowId, target } = props
    //   target.setValues([
    //     {
    //       rowKey: rowId,
    //       values: {
    //         materialName: value[0] + '/' + value[1] + '/' + value[2]
    //       }
    //     }
    //   ])
    // },
    handleCancel() {
      this.$emit('handleCancel', false)
    },
    handleReset() {
      this.form1.resetFields() //重置基本信息
      this.$refs.detailInfoForm.getValues((err, values) => {
        //重置详细信息
        let rowId = Array.from(values, x => x.id)
        this.$refs.detailInfoForm.removeRows(rowId)
      })
    },
    handleOk() {
      this.form1.validateFields((err, values) => {
        if (!err) {
          //先验证基本信息
          this.basicInfoForm = values
          this.basicInfoForm.purchaseDate = moment(this.basicInfoForm.purchaseDate).format('YYYY-MM-SS')
          this.basicInfoForm.checkoutDate = moment(this.basicInfoForm.checkoutDate).format('YYYY-MM-SS')
          console.log('基本信息：', this.basicInfoForm)

          this.$refs.detailInfoForm.getValues((err, values) => {
            //再验证详细信息
            if (!err && values.length) {
              this.detailsInfoForm = values
              console.log('详细信息：', this.detailsInfoForm)
              this.$emit('handleCancel', false) //关闭窗口
              this.handleReset() //重置表单
            }
          })
        }
      })
    },
    onValueChange() {},
    onInEntryAdded() {},
    changeName(value, props) {
      console.log(value, props)
      console.log(props.getValue())
      let { rowId, target } = props
      target.setValues([
        {
          rowKey: rowId,
          values: value
        }
      ])
      // if (value == '李霞') {
      //   this.phoneArrange = '13759655332'
      // }
      // if (value == '尤晓梅') {
      //   this.phoneArrange = '13053955537'
      // }
      // if (value == '黄丽娟') {
      //   this.phoneArrange = '13659655381'
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-row.ant-form-item {
  margin-bottom: 12px;
}
</style>