import React from 'react'
export default function Settings() {
  const desc = `作者：sherlock2006
  岗位职责
  1、对华为产品的软件质量进行把关；理解产品设计原理、实现过程；
  2、制订测试计划、规划测试方案、编写软件测试工具、执行软件测试、分析测试数据、输出测试报告；
  3、对测试中的问题进行分析和定位，与开发人员一起寻求解决方案；
  4、提出对产品的进一步改进的建议，并评估改进方案是否合理；对测试结果进行总结与统计分析；
  5、能负责各个产品和解决方案的准入测试、比拼测试、选型测试，负责重大跨领域项目集成交付、问题故障界定、技术能力中心（包括竞争分析、场景分析、性能分析）的建设等工作；
  6、能直接与全球顶级的运营商、行业客户沟通对话，以专业的技术，架起华为与客户之间沟通的桥梁。`
  return (
    <div>
      <div className="w-screen flex items-center justify-center mt-3 flex-col">
        <div className="text-primary-default font-semibold text-3xl">
          更改你的信息
        </div>
        <form className="flex items-start justify-center flex-col w-3/4">
          <div className="font-semibold text-lg">个人介绍</div>
          <textarea
            placeholder="请输入摘要"
            className="border-2 rounded-md shadow-md p-3 resize-none border-none w-3/4 placeholder-gray-500  mt-3 outline-none text-lg mb-4"
            rows={7}
            autoFocus={false}
          />
          <div className="font-semibold text-lg">主页头图</div>
          <div className="font-semibold text-lg">我的头像</div>
        </form>
      </div>
    </div>
  )
}
