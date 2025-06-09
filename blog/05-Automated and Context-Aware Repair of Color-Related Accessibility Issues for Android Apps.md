---
title: Automated and Context-Aware Repair of Color-Related Accessibility Issues for Android Apps
authors: [zqqqj]
tags: []
date: 2025-06-09
---

# Automated and Context-Aware Repair of Color-Related Accessibility Issues for Android Apps

## 1. 摘要

约 15% 的全球人口受到各种残障或视力障碍的影响，但许多移动端的用户体验（UX）设计师和开发者在开发 App 时并未重视可访问性问题。这意味着每七个人中就有一个用户在使用 App 时面临不平等的体验，这不仅影响用户，也可能违反相关法规。实际上，如果 App 开发时考虑可访问性，不仅能提升整体用户体验，还能提升商业价值。因此，已有不少研究和检测工具被提出用于识别可访问性问题。

然而，与检测相比，**修复工作明显滞后**，尤其是“颜色相关的可访问性问题”——比如文字对比度不足和图片对比度不佳，这类问题极大地影响了低视力用户和老年用户的使用体验，而当前的修复方法对此无能为力。

为此，我们提出了 Iris：一种自动化且具备上下文感知能力的方法，用于修复颜色相关的可访问性问题。该方法通过设计一致性的颜色替换策略和属性定位算法，在**修复问题的同时保持 UI 风格的一致性**。实验显示，Iris 可达到 91.38% 的修复成功率，且效率较高。用户调研也表明其结果令人满意，开发者反馈积极。我们在 GitHub 上提交的 40 个 Pull Request 中已有 9 个被合并，另有 4 个正在积极沟通后续修复。Iris 工具现已开源，旨在推动移动可访问性修复领域的进一步研究。

## 2. introduction

懒的讲了，感觉没啥用。反正大意就是解决这三个问题

**1.** 修复后必须保持原始 UI 页面的设计风格一致性；
**2.** 必须准确定位待修复的 UI 组件及其颜色属性；
**3.** 修复结果需被真实用户和开发者接受，具备实用性。

作者提出了 iris，可以弄一个流程图体现该作者的研究工作

【图】

## 3. Preliminary

### 3.1 标准

需要解决以下问题：

1. 普通文本要求前景色与背景色的对比度 ≥4.5:1\*
2. 大号加粗文本则要求 ≥3:1

## 3.2 颜色实现方式

在 xml 文件中，颜色一般是这样表达的

```
<TextView android:textColor="#80ff0000" />
<Button android:background="#80ff0000" />
```

提出 iris 用于修复这样的问题

## 3.3 检测工具提供的输入

这部分有很多，但是这个作者毫无创新，只是单纯的将各种工具整合而已（也有可能我不是这个方向的，不知道主流是什么样的^\_^）

# 4. Approach

这块是 iris 的核心部分，主要流程如下

1. **参考数据库构建（Reference DB Construction）**
2. **上下文感知的颜色选择（Context-aware Color Selection）**
3. **待修复属性定位（Attribute-to-Repair Localization）**

## 4.1 Reference DB Construction

**目的**：提供颜色替换时的“设计参考”。

**流程**：

- 使用 Xbot 对近 9978 个 APK 检测；
- 收集其中未出现颜色对比度问题的 UI 组件；
- 根据组件类型分类（如 Button、TextView 等）；
- 从 UI 截图中提取每个组件的前景色和背景色；
- 使用\*\* \*\*`getcolors()` 获取最常出现的两种颜色；
- 对比颜色值，保留满足对比度要求的颜色对，构建数据库。

**优势**：使用真实 App 中“被认可的配色”作为修复备选，**提高了颜色风格的一致性**。

## 4.2 Context-Aware Color Selection

算法流程在原文中给了，简单来说就是

- 输入：当前问题颜色、颜色候选集、页面色调类型、偏转角；
- 筛选候选颜色集，计算最小“色调距离”；
- 如果没有合适候选色，就使用 HSV 微调获得备选颜色；
- 返回最接近原设计的最优替换色。

## 4.3 Attribute-to-Repair Localization

根据 Xbot 报告，精准找到需要修改的 XML 属性或代码

定位方式：

- **组件 ID（resource-id）存在时**：可直接在反编译的 layout 中精确查找；
- **仅有 bounds 坐标时**：通过坐标在 layout tree 中找到组件，再通过文本等信息比对 XML 结构中的\*\* \*\*`android:text`属性，进行模糊定位。

# 5. 复现

前文我们知道了该论文有两部分组成，Xbot 和 iris 部分，因此我们一点一点来，先讲 Xbot 部分

## 5.1 Xbot

### 5.1.1 下载原代码

首先把 GitHub 仓库给 down 下来

仓库地址：https://github.com/tjusenchen/Xbot

这是一个很老的代码，需要用到 py2 来运行，mac 上是不能通过 conda 下载 py2 版本的，因此这般选择 pyenv（也是一种管理工具，和 conda 差不多），如果是 windows 用户的话可忽略

### 5.1.2 安装模拟器

模拟器也要和仓库中的 readme 中一样，选择 Android 7.1.1+PIX，如果太新的话会导致兼容性问题。

在创建好了模拟器之后，可以通过该命令检查是否连上了

```
adb devices
```

跳出来你的模拟器名字就 ok 了，如果你没看到的话，有很大原因是你没启动（我因为这个问题卡了一下午，md）

当然，使用的前提是你得先把 adb 下了，可以通过如下命令查看

```
adb version

Android Debug Bridge version 1.0.41
Version ...

```

系统默认一般是会带有的，路径如下

macOS:`~/Library/Android/sdk/platform-tools/adb`

Windows:C:\Users\<用户名>\AppData\Local\Android\Sdk\platform-tools\adb`

如果发现没的话也问题不大，去官网下一个

官网地址：[https://developer.android.com/studio/releases/platform-tools](https://developer.android.com/studio/releases/platform-tools)

然后解压添加到环境变量一条龙就 ok 了

### 5.1.3 安装 apk 文件

这部分就不用多说了，把 adb 命名下载好了之后就 adb install，例如

```
adb install path/to/your_app.apk
```

需要安装两个，分别是 GAS 和 Vol 的这两个 apk，都是在仓库里给了的，直接安装就行。

**尤其需要注意！！！**GAS 下载了之后，需要现在模拟器里设置- accessibility-GAS，打开服务。打开之后会跳出一个蓝色框框，然后再代码中修改你的这个悬浮窗的坐标，不然会造成闪退的情况！！！！！！修改的代码叫做 explore_activaity.py，scan_and_return 函数中

还有一个 vol 就没啥好说的了，下了就行，这是一个景点经典用 apk

### 5.1.4 运行 Xbot

**1. 准备工作：**

1. Python 环境

- 推荐使用** \*\***Python 2.7\*\*
- 所需库基本为标准库：如\*\* **`os`,** **`commands`,** **`csv`,** **`shutil`,** \*\*`time`

2. Genymotion 模拟器准备

- 已安装** \*\***Genymotion Desktop\*\*
- 启动一个设备（例如\*\* \*\*`127.0.0.1:6555`）
- 模拟器 root 权限已开启（`adb root` 可运行）

**2. 文件与路径结构检查**

目录结构（假设在\*\* \*\*`Xbot-main` 下运行）

```
├── code/                      # Python 脚本主目录
│   ├── run_xbot.py            # 主运行脚本
│   ├── explore_activity.py    # 动态探索逻辑
│   ├── repkg_apk.py           # 重打包逻辑（已用可选）
├── apks/                      # 存放待测 APK 的目录
│   └── xxx.apk
├── config/                    # 相关配置
│   ├── coolapk.keystore
│   ├── libs/
│   │   └── android-platforms/
├── results/                   # 自动创建，输出目录
├── storydroid/               # 自动创建，用于参数记录等
```

**3. APK 文件命名注意：**

- `.apk` 文件放在\*\* **`apks/` 中，**不要加中文名或特殊字符\*\*
- 如\*\* \*\*`a2dp.Vol_133.apk`

**4. 代码准备工作**

1. 确认\*\* \*\*`run_xbot.py` 开头几项路径为你本机配置，例如

```
java_home_path = '/Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk/Contents/Home/'
sdk_platform_path = '/Users/yourname/.../android-platforms/'
lib_home_path = '/Users/yourname/.../libs/'

```

2. 清理旧 outputs（可选）

```
rm -rf results/ storydroid/

```

**5. 执行命令**

```
cd Xbot-main/code

python run_xbot.py 127.0.0.1:6555 ../main-folder/apks/

# adb
adb devices.   # 查看设备名字

```

**6. 运行 xml 修复**

Xbot 只有原始 apk 页面的 Xbot，还需要通过 issues 来生成新的 xml 以让 iris 知道哪个组件有问题

```
python3 Xbot-main/code/txt2irisxml.py \
  Xbot-main/results/outputs/a2dp.Vol_133/issues/a2dp.Vol.EditDevice/a2dp.Vol.EditDevice.txt \
  Xbot-main/results/outputs/a2dp.Vol_133/issues/a2dp.Vol.EditDevice/AccessibilityScanner.xml
```

贴出 txt2irisxml 代码，放在 code 目录下面

```

# -*- coding: utf-8 -*-
import os
import sys
import xml.etree.ElementTree as ET

def parse_txt(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]

    issues = []
    i = 0
    while i < len(lines):
        line = lines[i]

        # --- Item label / Missing label
        if "Item label" in line:
            i += 1
            res_id = lines[i] if i < len(lines) else "unknown"
            issues.append({
                "Type": "MissingLabel",
                "ResourceID": res_id,
                "Class": "android.widget.EditText"
            })
            i += 1

        # --- Text contrast
        elif "Text contrast" in line:
            i += 1
            res_id = lines[i] if i < len(lines) else "unknown"
            i += 1
            ratio = "N/A"
            if i < len(lines) and "contrast ratio is" in lines[i]:
                try:
                    ratio = lines[i].split("contrast ratio is")[1].split(".")[0] + "." + lines[i].split("contrast ratio is")[1].split(".")[1][:2]
                except:
                    pass
            issues.append({
                "Type": "LowTextContrast",
                "ResourceID": res_id,
                "Class": "android.widget.TextView",
                "ContrastRatio": ratio
            })
            i += 1

        # --- Touch target too small
        elif "Touch target" in line:
            i += 1
            res_id = lines[i] if i < len(lines) else "unknown"
            issues.append({
                "Type": "TouchTargetTooSmall",
                "ResourceID": res_id,
                "Class": "android.widget.Button"
            })
            i += 1

        else:
            i += 1

    return issues

def write_xml(issues, output_path):
    root = ET.Element("AccessibilityIssues")

    for issue in issues:
        item = ET.SubElement(root, "Issue")
        ET.SubElement(item, "Type").text = issue.get("Type", "Unknown")
        ET.SubElement(item, "ResourceID").text = issue.get("ResourceID", "unknown")
        ET.SubElement(item, "Class").text = issue.get("Class", "android.view.View")
        if "ContrastRatio" in issue:
            ET.SubElement(item, "ContrastRatio").text = issue["ContrastRatio"]

    tree = ET.ElementTree(root)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    tree.write(output_path, encoding="utf-8", xml_declaration=True)
    print(f"✅ Created XML: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python txt2irisxml.py input.txt output.xml")
        sys.exit(1)

    txt_file = sys.argv[1]
    xml_file = sys.argv[2]
    issues = parse_txt(txt_file)
    write_xml(issues, xml_file)

```

**7. 运行结果**

在/results/apk_name 中。主要需要的是 outputs 这个文件夹

## 5.2 IRIS

### 5.2.1. 解压 zip 文件

```
cd /root
unzip iris-mobile-master.zip
mv iris-mobile-master iris-mobiles
```

同时需要将之前 Xbot 的输出 outputs 存放在根目录下，zip 是原始在 GitHub 中下载的

GitHub 地址：https://github.com/tjuyuxinzhang/iris-mobile

2. 复制 Xbot 输出和 APK 到 IRIS 指定位置

```
mkdir -p /root/iris-mobile/code/data/xbot_output
cp -r /root/outputs/a2dp.Vol_133 /root/iris-mobile/code/data/xbot_output/

mkdir -p /root/iris-mobile/apks
cp /root/outputs/a2dp.Vol_133.apk /root/iris-mobile/apks/

```

### 5.2.2 修改一些路径代码

1. repair_repack_class.py

```
results_folder = "/root/iris-mobile"
resultPath = '/root/iris-mobile/refDB'  # 若没有这个文件夹可先建空目录
outputsPath = '/root/outputs'
```

2. harmonizationTs2.py

把 250 行的 plt 部分注释了（如果用的是虚拟机，无图形页面的话）

### 5.2.3 切换目录并运行 IRIS 修复脚本

```
cd /root/iris-mobile/code
python2 repair_repack_class.py --app_name a2dp.Vol_133
```

### 5.2.4 运行结果

需要包含这些东西

1. decompiling

```
decompiling...
I: Using Apktool 2.4.1 on a2dp.Vol_133.apk
I: Loading resource table...
I: Decoding AndroidManifest.xml with resources...
I: Loading resource table from file: /root/.local/share/apktool/framework/1.apk
I: Regular manifest package...
I: Decoding file-resources...
I: Decoding values */* XMLs...
I: Baksmaling classes.dex...
I: Copying assets and libs...
I: Copying unknown files...
I: Copying original files...
act_T_Alpha
```

2. color layout

```
id_bound_colorSet
{'Path': (['#817278', '#F9EEF0'], 4.5, 'ManageData', '', 'Text contrast'), 'Action:': (['#F7ECEE', '#F9EEF0'], 3, 'CustomIntentMaker', 'TextView', 'Text contrast'), 'title': (['#2979FF', '#F9EEF0'], 4.5, 'Preferences', '', 'Text contrast'), 'Data:': (['#FFFFFF', '#F9EEF0'], 3, 'CustomIntentMaker', 'TextView', 'Text contrast'), 'empty': (['#FFFFFF', '#F9EEF0'], 3, 'ProviderList', '', 'Text contrast'), 'Type:': (['#FFFFFF', '#F9EEF0'], 3, 'CustomIntentMaker', 'TextView', 'Text contrast'), 'Output': (['#817278', '#F9EEF0'], 4.5, 'ManageData', '', 'Text contrast'), 'pi_tv_name': (['#FFFFFF', '#F9EEF0'], 3, 'PackagesChooser', '', 'Text contrast')}
waitChangeColor_self
{'pi_tv_name': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'title': ('#2153AE', ['#2979FF', '#F9EEF0'], 4.5), 'Data:': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'Output': ('#504348', ['#817278', '#F9EEF0'], 4.5), 'Action:': ('', ['#F7ECEE', '#F9EEF0'], 3), 'Type:': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'Path': ('#504348', ['#817278', '#F9EEF0'], 4.5), 'empty': ('#585858', ['#FFFFFF', '#F9EEF0'], 3)}
colorToChange_self
{'Path': '#504348', 'title': '#2153AE', 'Data:': '#585858', 'empty': '#585858', 'Type:': '#585858', 'Output': '#504348', 'pi_tv_name': '#585858'}
['#F7ECEE', '#F9EEF0']
[]
colorToChange_Layout
{'Path': '#504348', 'title': '#2153AE', 'Action:': '#000000', 'Data:': '#585858', 'empty': '#585858', 'Type:': '#585858', 'Output': '#504348', 'pi_tv_name': '#585858'}
imageId_Name
{}
{('Data:', 'TextView'): '[0,332][263,436]', ('Path', 'TextView'): '[0,524][532,575]', ('Type:', 'TextView'): '[0,453][263,557]', ('pi_tv_name', 'TextView'): '[173,1610][954,1741]', ('Action:', 'TextView'): '[0,211][263,315]', ('title', 'TextView'): '[42,1756][626,1794]', ('empty', 'TextView'): '[53,263][1027,601]', ('Output', 'TextView'): '[465,575][614,669]'}
{}
[]
{'Path': '#504348', '[0,453][263,557]': '#585858', 'title': '#2153AE', '[0,332][263,436]': '#585858', 'empty': '#585858', '[0,211][263,315]': '#000000', 'Output': '#504348', 'pi_tv_name': '#585858'}
waitChangeColor_self
{'pi_tv_name': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'title': ('#2153AE', ['#2979FF', '#F9EEF0'], 4.5), 'Data:': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'Output': ('#504348', ['#817278', '#F9EEF0'], 4.5), 'Action:': ('', ['#F7ECEE', '#F9EEF0'], 3), 'Type:': ('#585858', ['#FFFFFF', '#F9EEF0'], 3), 'Path': ('#504348', ['#817278', '#F9EEF0'], 4.5), 'empty': ('#585858', ['#FFFFFF', '#F9EEF0'], 3)}
{}
recompile...
('time cost', 327.10186195373535, 's')

```

### 5.2.5 修复后的 apk 文件

```
/root/iris-mobile/repackaged/a2dp.Vol_133.apk
```

### 5.2.6 将其放在 mac 上的 apk 文件夹中，签名下载运行（Xbot 再次比对）

1. 签名 apk

```
/Users/qijiazhou/Library/Android/sdk/build-tools/36.0.0/apksigner sign \
  --ks ~/Desktop/test-key.jks \
  --ks-key-alias testkey \
  --ks-pass pass:123456 \
  --key-pass pass:123456 \
  --out ~/Desktop/apk/a2dp.Vol_133_signed.apk \
  ~/Desktop/apk/a2dp.Vol_133.apk
```

2. 安装测试

```
adb install -r ~/Desktop/apk/a2dp.Vol_133_signed.apk
```

接着就是再运行 Xbot 的过程，将其放入 main- folder/apks 文件夹中

## 6. Experiments

用户调查就不说了，按照复现流程走下来应该是能一样的。当然，此处可以讲一下修复成功率计算公式评价指标

```
Repire = 修复成功的问题数/该app原始问题数 * 100%
```
