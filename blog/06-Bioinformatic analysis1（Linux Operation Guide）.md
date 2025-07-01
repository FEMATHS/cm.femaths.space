---
title: Bioinformatic analysis:linux操作指南之上游分析(Part 1)
authors: [zqqqj]
tags: [Bioinformatic analysis]
date: 2025-06-08
---

# 上游分析

## 1. 安装 linux

这就不多说了，自己搞一个虚拟机，我用的是 Centos7。

ps：如果使用的是学校集群的话，注意在修改密码中改一下自己的密码，开启后账号为：root，密码自定义（注意是暗文，你敲进去是不会显示的）结束了 enter 即可

## 2. 预先安装

首先要安装 anaconda，为了不污染环境

```
-- 安装linux安装包（如果报错自己去anaconda网站找地址）
wget https://repo.anaconda.com/archive/Anaconda3-2023.07-Linux-x86_64.sh

-- 解压anaconda，后面的就是刚刚安装好的名字
bash Anaconda3-2023.07-Linux-x86_64.sh

-- 更新环境变量
source ~/.bashrc
```

<!-- truncate -->

至此，anaconda 安装完成。我们再创建一个环境，专门用于生信分析

tips：anaconda 教程请查看 TensorFlow1 教程，需要包含的步骤为：

1. create 一个虚拟环境
2. 设置镜像中除了最后一个，其他都跑
3. 下载 fastqc

## 3. 安装分析软件

这些软件因人而异，不一定需要全下载

```
-- 最主要的分析fast格式的软件
conda install fastqc

-- 有时候fastq不止一个文件，联合分析
conda install multigc

-- 高通量测序数据中去除接头序列和其他不需要的序列
conda install -c bioconda cutadapt

-- 用于将sra转化为fastq文件的脚本
conda install sra-tools

```

cellranger 单独拎出来讲，这个软件应该使用到的频率比较大

```
-- 下载安装包（上官网找，复制粘贴即可，如果报错和anaconda一样）
wget -O cellranger-8.0.1.tar.gz "https://cf.10xgenomics.com/releases/cell-exp/cellranger-8.0.1.tar.gz?Expires=1724187641&Key-Pair-Id=APKAI7S6A5RYOXBWRPDA&Signature=Nym8cB6esJ3Zk7nueAU7BG3hhF2IZBp9FpD4OE5gW0a7C-m4ob7lChp0W-j7ydgnEBYafZ~igPGR~DzUq4CxsXS4XwkENuKhwn7Xr7RbdO~wGGh03fWzYyYt~Y7FK~V~73DzJEplvcls0p~KdbcQYvb7NflwtO9YMY~FnO4fB2VmFf5QBMdpXbPubMG~jNWE58ki7zr6ilsMGAfEnI6Po4cpZKKe1VCN7zJeipUKqS9qj~jGRpIGjHV9abluAPeodE-zCk0F-bsMpXSx6x~avzQfrN6ViJoRNEBemaB7anzMOTJ7L3XEP~QprOaJKKobFWZBGz4MBXokQBxByAZObQ__"

-- 解压，xyz为版本号
tar -xzvf cellranger-x.y.z.tar.gz

-- 配置环境变量
source ~/.bashrc

-- 查看是否成功
cellranger --version

-------如果失败，进入到vim中写，vim对于初学者来说比较复杂，建议认真读教程，不要多做也不要少做-------
-- 1. 打开文件
vim ~/.bashrc
-- 2. 进入编辑模式 ，按键盘i键
-- 3. 添加cellranger的路径，将光标移到最后一行，添加内容（-8.0.1是cellranger文件夹的名字，看自己下载的名字是什么）
export PATH=$PATH:/root/cellranger-8.0.1/bin
-- 4. 先按Esc退出编辑模式，然后输入:wq，最后按enter
-- 5. 重加载
source ~/.bashrc
-- 6.查看是否成功
cellranger --version
```

## 4. 测序数据质量评估

ok，开始正式的质量评估

#### 4.1 cutadapt

**去除接头序列**：

在测序过程中，接头序列会附加到 DNA 或 RNA 片段的两端。`cutadapt` 可以从测序读段（reads）中识别并去除这些接头序列。

**去除低质量碱基**：

除了接头序列，还可以去除位于读段两端的低质量碱基，保证下游分析中使用的是高质量的数据。

**处理指定长度的序列**：

可以设置参数来过滤特定长度的序列，比如去除过短或过长的序列，这有助于控制下游数据分析中的数据质量。

**双端测序数据处理**：

`cutadapt` 支持双端测序数据，可以同时处理两端的序列，并保持双端读段的配对关系。

ps：在做 cutadapt 之前，首先是需要通过 fastqc 的质控报告观测是否需要去除的，具体在 Adapter Content 这一栏中，如果是打钩就不需要，打叉的话分情况讨论：

1. 数据数据集上 down 下来的数据一般会显示测序的平台是啥，这时候使用平台默认的就 ok 了
2. 自己的数据也知道用的测序平台是啥，同上

如果用的是 illumina 的话，read1 为 AGATCGGAAGAGC，read2 为 AATGATACGGCGACC。如果用的是其他测序平台的话，建议翻看手册查询（一般都会给出的）

```
-- 检查接头序列
cutadapt --detect-adapters -o /path/to/trimmed_output.fq /path/to/input.fq

-- 本数据为read2（illumina），read1同理，反正都要处理
cutadapt -a AGATCGGAAGAGC -q 20 --minimum-length 50 \
         -j 4 \
         -o /root/rowdata/Rhesus-Liver-1_L1_2_trimmed.fq.gz \
         /root/rowdata/Rhesus-Liver-1_L1_2.fq.gz


```

在预处理完数据之后，就可以通过 fastqc 可视化数据质量了，可以百度网页结果

```
fastqc -t 4 -o ~/fastqc_output /root/rowdata/Rhesus-Liver-1_L1_2.fq.gz
```

#### 4.2 cellranger

1. **创建自定义参考基因组**

```
-- 这一步是因为我的gtf中，Curated Genomic包含空格，因此需要替换为Curated_Genomic
sed 's/Curated Genomic/Curated_Genomic/g' GCF_003339765.1_Mmul_10_genomic.gtf > fixed_GCF_003339765.1_Mmul_10_genomic.gtf

-- 设置核心数，按照自己的配置来定，一般max-1就ok了
export CELLRANGER_NUM_THREADS=15

-- 如果没有处理过gtf的话，原名就ok，如果sed了，那就改成自己处理后的gtf文件名，output-dir为文件输出的位置，可自定义
cellranger mkref --genome=mmul_ref \
--fasta=/root/compare/GCF_003339765.1_Mmul_10_genomic.fna \
--genes=/root/compare/fixed_GCF_003339765.1_Mmul_10_genomic.gtf \
--output-dir=/root/compare/mmul_ref


```

2. **使用 `cellranger count` 进行比对和分析**

```
cellranger count \
  --id=liver_analysis \  # 输出文件夹的名称
  --transcriptome=/root/compare/mmul_ref \  # 参考基因组路径
  --fastqs=/root/liver_PE \  # 存放FASTQ文件的目录
  --sample=sample_name \  # 样本名称，一般为liver_PE-1或liver_PE-2这样的
  --expect-cells=1000 \  # 预期细胞数，可根据实验设定调整（也可不用，默认1k）
  --localcores=16 \  # 使用的核心数
  --localmem=180  # 使用的内存（GB）
  --create-bam=true  # 通常默认，但是当发生该参数缺少的报错时可以显式添加

```

需要注意的是，如果我有 liver_PE-1 和 liver_PE-2，那需要分别跑两次，然后对其进行合并

3. **使用`cellranger arr`对结果进行合并**

首先船舰 csv 文件，列出每个样本的`molecule_info.h5` 文件路径，内容如下：

```
library_id,molecule_h5
liver_PE-1,/root/liver_analysis1/outs/molecule_info.h5
liver_PE-2,/root/liver_analysis2/outs/molecule_info.h5
```

随后对其进行合并

```
cellranger aggr \
  --id=liver_combined_analysis \
  --csv=aggregation.csv \
  --normalize=mapped \
  --localcores=16 \
  --localmem=180
```

生成一个新的文件夹 `liver_combined_analysis`，其中包含合并后的 `filtered_feature_bc_matrix` 文件夹。

---

ps:在此推荐两个小工具了，下载和安装就百度吧，基本上都有教程的

1. winscp 用于本地到服务器上的文件传输（可视化，很方便，并且也可以在这里增删改查文件）
2. finalshell 可以复制粘贴代码（学校集群 cv 不了），并且旁边有当前内存，储存空间，cpu 占用等有用的信息
