---
title: 相关GAN及其SRGAN消融试验
authors: [zqqqj]
tags: []
date: 2025-06-16
---

本文将从三部分，即GAN模型的理论部分，代码（实践）部分及SRGAN的消融试验部分展开介绍

# GAN对抗神经网络及其变种（理论部分）
## 1. GAN（Generative Adversarial Network）生成对抗网络
核心：由两个神经网络——生成器（Generator）和判别器（Discriminator）组成，通过博弈过程相互提升。
· 生成器：试图“伪造”以假乱真的数据。
· 判别器：判断输入是真实数据还是生成器伪造的。
· 训练目标：生成器希望骗过判别器，判别器希望准确识别真假。
本质上是一个最大最小问题：
```math
\min_G \max_D \ \mathbb{E}_{x \sim p_{\text{data}}} \left[ \log D(x) \right] + \mathbb{E}_{z \sim p_z} \left[ \log \left(1 - D(G(z)) \right) \right]
```
## 2. cGAN（Conditional GAN）条件生成对抗网络
核心：在GAN的基础上，引入“条件”信息（如标签、图像、文本等）
· 生成器和判别器都接收条件变量
· G（z，y）：在条件 y 下生成图像
· D（x，y）：判断图像是否为在条件 y 下真实的
用途：图像翻译（如黑白图像上色）、语义图生成图像、文本生成图像
目标函数：
```math
\min_G \max_D \ \mathbb{E}_{x,y \sim p_{\text{data}}} \left[ \log D(x|y) \right] + \mathbb{E}_{z \sim p_z} \left[ \log \left(1 - D(G(z|y)) \right) \right]

```

## 3. SRGAN
目的：图像超分辨率，即将低分辨率图像（LR）还原成高分辨率图像（HR）
· 生成器结构：使用残差网络（ResNet）进行细节重建。
· 判别器：区分生成的高分图像和真实高分图像。
损失函数包含：
· 内容损失（如 MSE 或感知损失）；
· 对抗损失（判别器输出）
· 感知损失（Perceptual Loss）：在 VGG 网络的高层 feature 上计算差异，更贴近人类视觉感受

## 4. ESRGAN
基于SRGAN，具有如下优势：
1. Residual-in-Residual Dense Block (RRDB)：替换原 SRGAN 的残差块，结构更深，信息流更丰富。
2. 对抗损失改进：采用 Relativistic average GAN（RaGAN），即判断“生成图是否比真实图更假”，而不是简单判断真假。
3. 感知损失优化：使用未归一化的 VGG 特征图，避免图像过光滑。
4. 训练技巧：使用多阶段训练，包括先训练内容损失，再加入对抗训练

## 总结（理论部分）
| 名称     | 全称                         | 类型     | 特点概述             |
| ------ | -------------------------- | ------ | ---------------- |
| GAN    | Generative Adversarial Net | 无监督生成  | 对抗生成图像           |
| cGAN   | Conditional GAN            | 条件生成   | 加入标签或条件进行控制      |
| SRGAN  | Super-Resolution GAN       | 图像超分辨率 | 使用感知损失，生成自然高分图像  |
| ESRGAN | Enhanced SRGAN             | 图像超分辨率 | 加强网络结构和损失函数，细节更佳 |

**在后文的试验中，原始代码与数据集皆存放在GitHub仓库：https://github.com/zqqqqqqj1110/GAN_WB**

# GAN对抗神经网络及其变种（试验部分）
## 1. cGAN
本文以cGAN作为baseline，后续的gan变种模型皆由该部分代码变换而来，因此在这部分会讲的较为全面一些，后文可能会省略
### 1.1 安装需要的包与环境
```
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from skimage.metrics import peak_signal_noise_ratio, structural_similarity
import matplotlib.pyplot as plt
from pytorch_msssim import ms_ssim

device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(device)
```
作者使用的是MacOS，因此使用了mps，如果是cuda的话直接换成“cuda”即可，配置环境部分（gpu环境）可转到我的个人博客处查阅（或者在这更，懒了，小鸽一下^_^）

### 1.2 数据预处理
首先需要加载原始的数据集，接着在低分辨率下生成数据（下采样）与保存（通过双线性插值的方法），最后计算mean，std等标准指标（都是后面需要用到的，为了计算指标，不如手动自己计算一下）
```
# === 1. 加载原始 HR 数据 ===
hr_train = np.load("seasonal_split/HR_data_train_tm_Summer.npy")[:200]
hr_valid = np.load("seasonal_split/HR_data_valid_tm_Summer.npy")[:200]
hr_test = np.load("seasonal_split/HR_data_test_tm_Summer.npy")[:200]

# === 2. 生成 LR 数据（双线性插值至 16×16） ===
def downsample(hr_array, scale=4):
    tensor = torch.tensor(hr_array, dtype=torch.float32)
    return F.interpolate(tensor, scale_factor=1/scale, mode="bilinear", align_corners=False).numpy()

lr_train = downsample(hr_train)
lr_valid = downsample(hr_valid)
lr_test = downsample(hr_test)

# === 3. 保存为 .npy 文件 ===
np.save("tm/HR_data_train_40.npy", hr_train)
np.save("tm/LR_data_train_40.npy", lr_train)
np.save("tm/HR_data_valid_40.npy", hr_valid)
np.save("tm/LR_data_valid_40.npy", lr_valid)
np.save("tm/HR_data_test_40.npy", hr_test)
np.save("tm/LR_data_test_40.npy", lr_test)

# === 4. mean和std===
mean = np.mean(hr_train, axis=(0, 2, 3))[:, None, None]
std = np.std(hr_train, axis=(0, 2, 3))[:, None, None]
np.save("tm/mean_40.npy", mean)
np.save("tm/std_40.npy", std)

# 每个通道的 min 和 max（例如 2 个通道）
hr_min = hr_train.min(axis=(0, 2, 3))  # shape: (2,)
hr_max = hr_train.max(axis=(0, 2, 3))

# 保存为 .npy 文件，后续评估使用
np.save("tm/min_40.npy", hr_min.astype(np.float32))
np.save("tm/max_40.npy", hr_max.astype(np.float32))

print("完成：生成 LR/HR 切片、保存归一化参数，包括 test")
```
### 1.3 自定义数据集类
为了后续方便训练，自定义数据集类，主要是为了变形等操作。最终目的是对每张图进行归一化（标准化）并用于 DataLoader 加载训练/验证数据
```
class WeatherDataset(Dataset):
    def __init__(self, lr_path, hr_path, mean_path, std_path):
        self.lr = np.load(lr_path)
        self.hr = np.load(hr_path)
        self.mean = np.load(mean_path).reshape(2, 1, 1)
        self.std = np.load(std_path).reshape(2, 1, 1)

    def __len__(self):
        return len(self.lr)

    def __getitem__(self, idx):
        lr = (self.lr[idx] - self.mean) / self.std
        hr = (self.hr[idx] - self.mean) / self.std
        return torch.tensor(lr, dtype=torch.float32), torch.tensor(hr, dtype=torch.float32)
```

### 1.4 定义生成器
定义cGAN等生成器部分，编码器通过两层卷积和 LeakyReLU 将输入图像从 16×16 压缩至 4×4，用于提取深层特征；解码器则通过四层反卷积（ConvTranspose）逐步上采样回 64×64，同时使用 BatchNorm 和 ReLU 激活保持稳定性和非线性表达能力。最终一层使用 Tanh 激活输出高分辨率图像
```
class GeneratorUNet(nn.Module):
    def __init__(self, in_channels=2, out_channels=2, features=64):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(in_channels, features, 4, 2, 1),  # 16×16 → 8×8
            nn.LeakyReLU(0.2),
            nn.Conv2d(features, features * 2, 4, 2, 1),  # 8×8 → 4×4
            nn.BatchNorm2d(features * 2),
            nn.LeakyReLU(0.2),
        )
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(features * 2, features, 4, 2, 1),  # 4×4 → 8×8
            nn.BatchNorm2d(features),
            nn.ReLU(),
            nn.ConvTranspose2d(features, features, 4, 2, 1),  # 8×8 → 16×16
            nn.BatchNorm2d(features),
            nn.ReLU(),
            nn.ConvTranspose2d(features, features, 4, 2, 1),  # 16×16 → 32×32
            nn.BatchNorm2d(features),
            nn.ReLU(),
            nn.ConvTranspose2d(features, out_channels, 4, 2, 1),  # 32×32 → 64×64
            nn.Tanh()
        )

    def forward(self, x):
        return self.decoder(self.encoder(x))

```

### 1.5 定义判别器
使用多个卷积层对输入图像局部区域进行真实性判别，输入为上采样后的 LR 图像与真实/生成 HR 图像的拼接结果。网络逐层下采样并输出一个 7×7 的判别图，对图像中各个局部 patch 给出是否真实的预测评分
```
import torch.nn as nn

class Discriminator(nn.Module):
    def __init__(self, in_channels=4, features=64):
        super().__init__()
        self.model = nn.Sequential(
            nn.Conv2d(in_channels, features, 4, 2, 1),  # (B, 64, 32, 32)
            nn.LeakyReLU(0.2),
            nn.Conv2d(features, features * 2, 4, 2, 1),  # (B, 128, 16, 16)
            nn.BatchNorm2d(features * 2),
            nn.LeakyReLU(0.2),
            nn.Conv2d(features * 2, features * 4, 4, 2, 1),  # (B, 256, 8, 8)
            nn.BatchNorm2d(features * 4),
            nn.LeakyReLU(0.2),
            nn.Conv2d(features * 4, 1, 4, 1, 1),  # (B, 1, 7, 7) => PatchGAN 输出
            nn.Sigmoid()
        )

    def forward(self, lr_up, hr_or_fake):
        # Ensure both inputs are [B, 2, 64, 64]
        if lr_up.shape[-2:] != hr_or_fake.shape[-2:]:
            raise ValueError(f"Shape mismatch: lr_up={lr_up.shape}, hr={hr_or_fake.shape}")
        x = torch.cat([lr_up, hr_or_fake], dim=1)  # => [B, 4, H, W]
        return self.model(x)
```

### 1.6 计算指标
本文以SSIM，PSNR为例，对模型进行评估，需要注意的是归一化不应该是z-score，而是应该使用max-min归一化（吃过一次亏）
```
from skimage.metrics import peak_signal_noise_ratio, structural_similarity
import torch.nn.functional as F

def compute_psnr_ssim(pred, target):
    # 转换为 numpy 格式，shape: (N, H, W, C)
    pred = pred.detach().cpu().numpy().transpose(0, 2, 3, 1)
    target = target.detach().cpu().numpy().transpose(0, 2, 3, 1)
    data_range = max(target.max(), pred.max()) - min(target.min(), pred.min())
    psnr_total, ssim_total = 0, 0
    for p, t in zip(pred, target):
        psnr_total += peak_signal_noise_ratio(t, p, data_range=data_range)
        ssim_total += structural_similarity(t, p, channel_axis=-1, data_range=data_range)
    
    return psnr_total / len(pred), ssim_total / len(pred)

def compute_rmse(pred, target):
    return torch.sqrt(torch.mean((pred - target) ** 2))

def compute_mae(pred, target):
    return torch.mean(torch.abs(pred - target))

# === 添加 SSIM Loss ===
def ssim_loss(pred, target, C1=0.01**2, C2=0.03**2):
    mu_x = F.avg_pool2d(pred, 3, 1, 1)
    mu_y = F.avg_pool2d(target, 3, 1, 1)
    sigma_x = F.avg_pool2d(pred ** 2, 3, 1, 1) - mu_x ** 2
    sigma_y = F.avg_pool2d(target ** 2, 3, 1, 1) - mu_y ** 2
    sigma_xy = F.avg_pool2d(pred * target, 3, 1, 1) - mu_x * mu_y
    ssim_n = (2 * mu_x * mu_y + C1) * (2 * sigma_xy + C2)
    ssim_d = (mu_x ** 2 + mu_y ** 2 + C1) * (sigma_x + sigma_y + C2)
    ssim_map = ssim_n / (ssim_d + 1e-8)
    return 1 - ssim_map.mean()

# 加载 min/max
hr_min = np.load("tm/min_40.npy")[:, None, None]
hr_max = np.load("tm/max_40.npy")[:, None, None]

def minmax_scale(tensor):
    # 缩放到 0~1
    return (tensor - torch.tensor(hr_min, dtype=torch.float32).to(tensor.device)) / \
           (torch.tensor(hr_max - hr_min, dtype=torch.float32).to(tensor.device))
```

### 1.7 加载数据集，准备训练
batch size为将n个样本为一组（一个批次）读取数据.将之前的训练集，测试集与评估集上传到数据类并加载，准备训练。需要注意的是batch size越大，对gpu的负担也越大，但是同时训练到的数据也越多
```
train_set = WeatherDataset(
    "tm/LR_data_train_40.npy", "tm/HR_data_train_40.npy",
    "tm/mean_40.npy", "tm/std_40.npy"
)
val_set = WeatherDataset(
    "tm/LR_data_valid_40.npy", "tm/HR_data_valid_40.npy",
    "tm/mean_40.npy", "tm/std_40.npy"
)
test_set = WeatherDataset(
    "tm/LR_data_test_40.npy", "tm/HR_data_test_40.npy",
    "tm/mean_40.npy", "tm/std_40.npy"
)

test_loader = DataLoader(test_set, batch_size=32, shuffle=False)
train_loader = DataLoader(train_set, batch_size=32, shuffle=True)
val_loader = DataLoader(val_set, batch_size=32, shuffle=False)
```
### 1.8 模型训练
首先先对模型进行初始化，最后一句print为形状，如果形状不对后续训练必失败。实例化生成器和判别器并送到设备（MPS 或 CPU）；接着定义损失函数，MSELoss 用于像素级内容损失，BCELoss 用于 GAN 判别器对抗损失；最后定义优化器，使用ADAM进行优化并将学习率调为1e-4

```
# === 6. Model Initialization ===
G = GeneratorUNet().to(device)
D = Discriminator().to(device)
criterion_GAN = nn.BCEWithLogitsLoss()
criterion_L1 = nn.L1Loss()
opt_G = torch.optim.Adam(G.parameters(), lr=1e-4, betas=(0.5, 0.999), weight_decay=1e-4)
opt_D = torch.optim.Adam(D.parameters(), lr=1e-4, betas=(0.5, 0.999), weight_decay=1e-4)
with torch.no_grad():
    dummy_input = torch.randn(1, 2, 16, 16).to(device)
    dummy_output = G(dummy_input)
    print(f"G output shape: {dummy_output.shape}")  # 应该是 [1, 2, 64, 64]
```

准备好了之后，最后开始进行模型的训练与保存，训练时可以将每一轮epoch的指标都保存在数组中，方便后续画图；还需要注意在训练前准备标签构造，为对抗训练准备真假标签（用于 BCELoss）且判别器输出是 6×6 patch 的预测，匹配标签形状。
```
num_epochs = 200
train_psnrs, train_ssims, train_rmses, train_maes = [], [], [], []
val_psnrs, val_ssims, val_rmses, val_maes = [], [], [], []


for epoch in range(num_epochs):
    G.train()
    for lr, hr in train_loader:
        lr, hr = lr.to(device), hr.to(device)

        # === Forward Generator ===
        fake = G(lr).to(device)
        lr_up = F.interpolate(lr, size=hr.shape[-2:], mode="bilinear", align_corners=False)

        # === Train Discriminator ===
        D_real = D(lr_up, hr).to(device)
        D_fake = D(lr_up, fake.detach()).to(device)
        loss_D = (
            criterion_GAN(D_real, torch.ones_like(D_real)) +
            criterion_GAN(D_fake, torch.zeros_like(D_fake))
        ) * 0.5
        opt_D.zero_grad()
        loss_D.backward()
        opt_D.step()

        # === Train Generator ===
        pred = D(lr_up, fake)
        loss_ssim = ssim_loss(fake, hr)
        loss_l1 = criterion_L1(fake, hr)
        loss_gan = criterion_GAN(pred, torch.ones_like(pred))
        loss_G = 0.01 * loss_gan + 1.0 * loss_ssim + 1.0 * loss_l1
        opt_G.zero_grad()
        loss_G.backward()
        opt_G.step()


    train_pred = G(lr)
    train_pred = F.interpolate(train_pred, size=hr.shape[-2:], mode="bilinear", align_corners=False).to(device)
    # 评估
    train_pred_mm = minmax_scale(train_pred)
    hr_mm = minmax_scale(hr)
    psnr_train, ssim_train = compute_psnr_ssim(train_pred, hr)
    rmse_train = compute_rmse(train_pred_mm, hr_mm)
    mae_train = compute_mae(train_pred_mm, hr_mm)
    # 添加保存
    train_psnrs.append(psnr_train)
    train_ssims.append(ssim_train)
    train_rmses.append(rmse_train)
    train_maes.append(mae_train)

    G.eval()
    with torch.no_grad():
        val_lr, val_hr = next(iter(val_loader))
        val_lr, val_hr = val_lr.to(device), val_hr.to(device)
        pred_hr = G(val_lr)
        pred_hr = F.interpolate(pred_hr, size=val_hr.shape[-2:], mode="bilinear", align_corners=False).to(device)
        # 计算指标
        pred_val_mm = minmax_scale(pred_hr)
        val_hr_mm = minmax_scale(val_hr)
        psnr_val, ssim_val = compute_psnr_ssim(pred_hr, val_hr)
        rmse_val = compute_rmse(pred_val_mm, val_hr_mm)
        mae_val = compute_mae(pred_val_mm, val_hr_mm)
        # 添加保存
        val_psnrs.append(psnr_val)
        val_ssims.append(ssim_val)
        val_rmses.append(rmse_val)
        val_maes.append(mae_val)

    # === Print summary ===
    print(f"Epoch {epoch+1}: "
          f"Train PSNR={psnr_train:.2f}, SSIM={ssim_train:.4f}, RMSE={rmse_train:.4f}, MAE={mae_train:.4f} | "
          f"Valid PSNR={psnr_val:.2f}, SSIM={ssim_val:.4f}, RMSE={rmse_val:.4f}, MAE={mae_val:.4f}")
```

### 1.9 模型验证
训练完了之后对保存好了的模型进行test验证，查看评估指标的表现
```
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader

# === 1. 加载测试集 ===
test_set = WeatherDataset(
    "tm/LR_data_test_40.npy", "tm/HR_data_test_40.npy",
    "tm/mean_40.npy", "tm/std_40.npy"
)
test_loader = DataLoader(test_set, batch_size=8, shuffle=False)

# === 2. 在测试集上评估模型 ===
G.eval()
test_psnrs, test_ssims, test_rmses, test_maes = [], [], [], []
images_to_show = []  # 原图、真实图、预测图（反归一化后）

# 反归一化函数
mean = np.load("tm/mean_40.npy")
std = np.load("tm/std_40.npy")
def denormalize(tensor):
    return tensor * torch.tensor(std).to(tensor.device) + torch.tensor(mean).to(tensor.device)

with torch.no_grad():
    for test_lr, test_hr in test_loader:
        test_lr, test_hr = test_lr.to(device), test_hr.to(device)
        pred_test = G(test_lr)
        pred_test = F.interpolate(pred_test, size=test_hr.shape[-2:], mode="bilinear", align_corners=False)

        # 计算指标（归一化下）
        pred_mm = minmax_scale(pred_test)
        hr_mm = minmax_scale(test_hr)
        psnr, ssim = compute_psnr_ssim(pred_test, test_hr)
        rmse = compute_rmse(pred_mm, hr_mm)
        mae = compute_mae(pred_mm, hr_mm)
        test_psnrs.append(psnr)
        test_ssims.append(ssim)
        test_rmses.append(rmse.cpu().item())
        test_maes.append(mae.cpu().item())

        # 可视化：选取前1张图，反归一化
        for i in range(1):
            lr_img = F.interpolate(test_lr[i:i+1], size=(64, 64), mode="bilinear", align_corners=False)
            images_to_show.append((
                denormalize(lr_img[0].cpu()),
                denormalize(test_hr[i].cpu()),
                denormalize(pred_test[i].cpu())
            ))

# === 3. 打印测试集平均指标 ===
print(f"Test Set Evaluation cGAN Winter:")
print(f"PSNR: {np.mean(test_psnrs):.2f}")
print(f"SSIM: {np.mean(test_ssims):.4f}")
print(f"RMSE: {np.mean(test_rmses):.4f}")
print(f"MAE: {np.mean(test_maes):.4f}")
```
***********************************************************************************
**常用指标计算公式**
1. PSNR（峰值信噪比）
```math
\text{PSNR} = 10 \cdot \log_{10} \left( \frac{MAX^2}{\text{MSE}} \right)
```
---

2. SSIM（结构相似性）
```math
\text{SSIM}(x, y) = \frac{(2\mu_x \mu_y + C_1)(2\sigma_{xy} + C_2)}{(\mu_x^2 + \mu_y^2 + C_1)(\sigma_x^2 + \sigma_y^2 + C_2)}
```
---

3. RMSE（均方根误差）
```math
\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (x_i - y_i)^2}
```

---

4. MAE（平均绝对误差）
```math
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |x_i - y_i|
```


### 1.10 保存
这部分就不多说了，提供一下评估指标的保存方式，接着想可视化等等皆可

```
# 将数组保存为 .npy 文件
np.save("1_ssim_train.npy", train_ssims)
np.save("1_psnr_train.npy", train_psnrs)
np.save("1_ssim_valid.npy", val_ssims)
np.save("1_psnr_valid.npy", val_psnrs)

print("✅ 已保存为 1_ssim_train.npy, 1_psnr_train.npy, 1_ssim_valid.npy, 1_psnr_valid.npy")

# 确保每个 tensor 都通过 .detach() 断开计算图，之后转移到 CPU 并转换为 NumPy 数组
train_maes_cpu = [mae.detach().cpu().numpy() for mae in train_maes]
train_rmses_cpu = [rmse.detach().cpu().numpy() for rmse in train_rmses]
valid_maes_cpu = [mae.detach().cpu().numpy() for mae in val_maes]
valid_rmses_cpu = [rmse.detach().cpu().numpy() for rmse in val_rmses]

# 保存为 .npy 文件
np.save("1_mae_train.npy", train_maes_cpu)
np.save("1_rmes_train.npy", train_rmses_cpu)
np.save("1_mae_valid.npy", valid_maes_cpu)
np.save("1_rmes_valid.npy", valid_rmses_cpu)

# .npy 文件的列表
files = [
    "1_mae_train.npy", "1_mae_valid.npy", 
    "1_psnr_train.npy", "1_psnr_valid.npy",
    "1_rmes_train.npy", "1_rmes_valid.npy",
    "1_ssim_train.npy", "1_ssim_valid.npy"
]

# 创建一个字典来存储数据
data_dict = {}

# 加载每个 .npy 文件并存入字典
for file in files:
    data_dict[file] = np.load(file)

# 将字典转换为 pandas DataFrame
df = pd.DataFrame(data_dict)

# 将 DataFrame 保存为 CSV 文件
df.to_csv("cGAN_data_Winter.csv", index=False)
```

## 2. SRGAN
大部分可类比过来，具体就去看原代码，这里就讲一些不一样的部分，比如说生成器与判别器
### 2.1 生成器模型 SRResNetGenerator
该网络基本结构模仿 SRResNet，内含：
· Initial Layer：9x9 大卷积核 + PReLU
· 8 个残差块（每块带有两层卷积 + BN + PReLU）
· 残差连接（ResNet 风格）
上采样层：
· 使用 PixelShuffle 实现图像上采样（从 16x16 → 64x64）
· 最终卷积 + Tanh：输出范围规范为 [-1, 1]
```
class SRResNetGenerator(nn.Module):
    def __init__(self, in_channels=2, out_channels=2, features=64):
        super().__init__()
        self.initial = nn.Sequential(
            nn.Conv2d(in_channels, features, kernel_size=9, padding=4),
            nn.PReLU()
        )

        # 8 Residual Blocks
        res_blocks = []
        for _ in range(8):
            res_blocks.append(nn.Sequential(
                nn.Conv2d(features, features, kernel_size=3, padding=1),
                nn.BatchNorm2d(features),
                nn.PReLU(),
                nn.Conv2d(features, features, kernel_size=3, padding=1),
                nn.BatchNorm2d(features)
            ))
        self.res_blocks = nn.Sequential(*res_blocks)

        self.mid_conv = nn.Sequential(
            nn.Conv2d(features, features, kernel_size=3, padding=1),
            nn.BatchNorm2d(features)
        )

        self.upsample = nn.Sequential(
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
        )

        self.final = nn.Sequential(
            nn.Conv2d(features, out_channels, kernel_size=9, padding=4),
            nn.Tanh()
        )

    def forward(self, x):
        x1 = self.initial(x)
        res = x1
        for block in self.res_blocks:
            res = res + block(res)
        out = self.mid_conv(res)
        out = out + x1
        out = self.upsample(out)
        return self.final(out)
```

### 2.2 定义判别器 Discriminator
该判别器用于判断输入图像是否为真实高分图像，具体如下：
· 多层卷积+BN+LeakyReLU，最后输出为一个值
· 类似 PatchGAN 风格（结果为二维特征图）
· 最后一层采用 Sigmoid 激活，输出概率
```
import torch.nn as nn

class Discriminator(nn.Module):
    def __init__(self, in_channels=4, features=64):
        super().__init__()
        self.model = nn.Sequential(
            nn.Conv2d(in_channels, features, 4, 2, 1),  # (B, 64, 32, 32)
            nn.LeakyReLU(0.2),
            nn.Conv2d(features, features * 2, 4, 2, 1),  # (B, 128, 16, 16)
            nn.BatchNorm2d(features * 2),
            nn.LeakyReLU(0.2),
            nn.Conv2d(features * 2, features * 4, 4, 2, 1),  # (B, 256, 8, 8)
            nn.BatchNorm2d(features * 4),
            nn.LeakyReLU(0.2),
            nn.Conv2d(features * 4, 1, 4, 1, 1),  # (B, 1, 7, 7) => PatchGAN 输出
            nn.Sigmoid()
        )

    def forward(self, lr_up, hr_or_fake):
        # 确保为[B, 2, 64, 64]
        if lr_up.shape[-2:] != hr_or_fake.shape[-2:]:
            raise ValueError(f"Shape mismatch: lr_up={lr_up.shape}, hr={hr_or_fake.shape}")
        x = torch.cat([lr_up, hr_or_fake], dim=1)  # [B, 4, H, W]
        return self.model(x)
```
## 3. ESRGAN
### 3.1 生成器模型RDBNet
使用多个 残差密集块（RRDB），用于深层次特征提取与稳定训练；每个 RRDB 由三个去 BN 的 DenseBlock 组成，通过局部和全局残差连接增强梯度传播、抑制信息丢失。整体流程为：输入图像经卷积提取初步特征 → 多层 RRDB 提取深层表示 → 上采样模块逐步恢复空间分辨率 → 最终输出
```
import torch
import torch.nn as nn

# Dense Block（去掉BN + 残差缩放）
class DenseBlock(nn.Module):
    def __init__(self, channels=64, growth_channels=32):
        super().__init__()
        self.layers = nn.ModuleList()
        for i in range(5):
            self.layers.append(nn.Conv2d(channels + i * growth_channels, growth_channels, 3, 1, 1))
        self.lrelu = nn.LeakyReLU(0.2, inplace=True)
        self.conv_last = nn.Conv2d(channels + 5 * growth_channels, channels, 3, 1, 1)

    def forward(self, x):
        inputs = [x]
        for conv in self.layers:
            out = self.lrelu(conv(torch.cat(inputs, dim=1)))
            inputs.append(out)
        out = self.conv_last(torch.cat(inputs, dim=1))
        return x + out * 0.2  # Local residual

# RRDB
class RRDB(nn.Module):
    def __init__(self, channels, growth_channels=32):
        super().__init__()
        self.block1 = DenseBlock(channels, growth_channels)
        self.block2 = DenseBlock(channels, growth_channels)
        self.block3 = DenseBlock(channels, growth_channels)

    def forward(self, x):
        out = self.block1(x)
        out = self.block2(out)
        out = self.block3(out)
        return x + out * 0.2  # Global residual

# ESRGAN Generator (RRDBNet)
class RRDBNet(nn.Module):
    def __init__(self, in_channels=2, out_channels=2, features=64, num_blocks=8):
        super().__init__()
        self.conv_first = nn.Conv2d(in_channels, features, 3, 1, 1)

        # RRDB trunk
        self.rrdb_blocks = nn.Sequential(*[RRDB(features) for _ in range(num_blocks)])
        self.trunk_conv = nn.Conv2d(features, features, 3, 1, 1)

        # Upsampling blocks
        self.upsample = nn.Sequential(
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.LeakyReLU(0.2, inplace=True)
        )

        self.conv_last = nn.Conv2d(features, out_channels, 3, 1, 1)

    def forward(self, x):
        fea = self.conv_first(x)
        trunk = self.trunk_conv(self.rrdb_blocks(fea))
        fea = fea + trunk
        out = self.upsample(fea)
        out = self.conv_last(out)
        return out

```

### 3.2 判别器模型ESRDiscriminator
ESRDiscriminator 是一个深层 PatchGAN 判别器，通过逐层卷积下采样提取图像局部特征，并对 LR 图像与 HR 图像的拼接输入进行真假判别
```
class ESRDiscriminator(nn.Module):
    def __init__(self, in_channels=4, base_features=64):
        super().__init__()
        def block(in_f, out_f, stride):
            return nn.Sequential(
                nn.Conv2d(in_f, out_f, 3, stride, 1),
                nn.LeakyReLU(0.2, inplace=True)
            )

        layers = [
            block(in_channels, base_features, 1),
            block(base_features, base_features, 2),
            block(base_features, base_features * 2, 1),
            block(base_features * 2, base_features * 2, 2),
            block(base_features * 2, base_features * 4, 1),
            block(base_features * 4, base_features * 4, 2),
            block(base_features * 4, base_features * 8, 1),
            block(base_features * 8, base_features * 8, 2),
            nn.Conv2d(base_features * 8, 1, 3, 1, 1)  # PatchGAN 输出
        ]
        self.model = nn.Sequential(*layers)

    def forward(self, lr_up, hr_or_fake):
        if lr_up.shape[-2:] != hr_or_fake.shape[-2:]:
            raise ValueError(f"Shape mismatch: lr_up={lr_up.shape}, hr={hr_or_fake.shape}")
        x = torch.cat([lr_up, hr_or_fake], dim=1)  # 拼接输入 [B, 4, H, W]
        return self.model(x)
```

# SRGAN及其消融试验
以SRGAN为baseline，本文对比了四种情况，即
## 1. 损失函数改进版
除了使用传统的 MSE 和对抗损失，还使用了VGG perceptual loss（基于 VGG 网络的中间层）；MS-SSIM（多尺度结构相似性指标）
## 2. 通道注意力机制版
在生成器的残差块或特征融合模块中引入 Channel Attention 模块，同时引入 Squeeze-and-Excitation（SE）通道注意力模块，并在每个残差块之后插入 SEBlock(features)
```
class SEBlock(nn.Module):
    def __init__(self, channel, reduction=16):
        super(SEBlock, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.fc1 = nn.Conv2d(channel, channel // reduction, 1, bias=False)
        self.relu = nn.ReLU(inplace=True)
        self.fc2 = nn.Conv2d(channel // reduction, channel, 1, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        # Squeeze: Global Average Pooling
        y = self.avg_pool(x)
        # Excitation: Fully connected layers
        y = self.fc1(y)
        y = self.relu(y)
        y = self.fc2(y)
        y = self.sigmoid(y)
        return x * y
    

    

class SRResNetGenerator(nn.Module):
    def __init__(self, in_channels=2, out_channels=2, features=64):
        super(SRResNetGenerator, self).__init__()
        self.initial = nn.Sequential(
            nn.Conv2d(in_channels, features, kernel_size=9, padding=4),
            nn.PReLU()
        )

        # 8 Residual Blocks with SE Blocks
        res_blocks = []
        for _ in range(8):
            res_blocks.append(nn.Sequential(
                nn.Conv2d(features, features, kernel_size=3, padding=1),
                nn.BatchNorm2d(features),
                nn.PReLU(),
                nn.Conv2d(features, features, kernel_size=3, padding=1),
                nn.BatchNorm2d(features),
                SEBlock(features)  # Add SE Block after each residual block
            ))
        self.res_blocks = nn.Sequential(*res_blocks)

        self.mid_conv = nn.Sequential(
            nn.Conv2d(features, features, kernel_size=3, padding=1),
            nn.BatchNorm2d(features)
        )

        self.upsample = nn.Sequential(
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
        )

        self.final = nn.Sequential(
            nn.Conv2d(features, out_channels, kernel_size=9, padding=4),
            nn.Tanh()
        )

    def forward(self, x):
        x1 = self.initial(x)
        res = x1
        for block in self.res_blocks:
            res = res + block(res)
        out = self.mid_conv(res)
        out = out + x1
        out = self.upsample(out)
        return self.final(out)

```
## 3. 多尺度特征融合版
网络结构中引入多尺度特征处理模块（如使用 3x3、5x5、7x7 不同卷积核或金字塔结构），并将不同尺度特征拼接或加权融合，最后添加至 SRResNetGenerator 内部结构中
```
class MultiScaleFeatureFusion(nn.Module):
    def __init__(self, in_channels, features):
        super(MultiScaleFeatureFusion, self).__init__()
        # 使用膨胀卷积增加感受野
        self.scale1 = nn.Conv2d(in_channels, features, kernel_size=3, padding=1, dilation=1)
        self.scale2 = nn.Conv2d(in_channels, features, kernel_size=5, padding=2, dilation=1)
        self.scale3 = nn.Conv2d(in_channels, features, kernel_size=7, padding=3, dilation=1)
        
        self.fusion = nn.Conv2d(features * 3, features, kernel_size=1)

    def forward(self, x):
        x1 = self.scale1(x)
        x2 = self.scale2(x)
        x3 = self.scale3(x)
        fused = torch.cat([x1, x2, x3], dim=1)
        return self.fusion(fused)


class SRResNetGenerator(nn.Module):
    def __init__(self, in_channels=2, out_channels=2, features=64):
        super(SRResNetGenerator, self).__init__()
        self.initial = nn.Sequential(
            nn.Conv2d(in_channels, features, kernel_size=9, padding=4),
            nn.PReLU()
        )

        # Multi-scale feature fusion module
        self.multi_scale_fusion = MultiScaleFeatureFusion(in_channels=features, features=features)

        # 修改残差块，使用膨胀卷积
        res_blocks = []
        for _ in range(8):  # 保持16个残差块
            res_blocks.append(nn.Sequential(
                nn.Conv2d(features, features, kernel_size=3, padding=2, dilation=2),  # 使用膨胀卷积
                nn.BatchNorm2d(features),
                nn.PReLU(),
                nn.Conv2d(features, features, kernel_size=3, padding=2, dilation=2),  # 使用膨胀卷积
                nn.BatchNorm2d(features)
            ))
        self.res_blocks = nn.Sequential(*res_blocks)

        self.mid_conv = nn.Sequential(
            nn.Conv2d(features, features, kernel_size=3, padding=1),
            nn.BatchNorm2d(features)
        )

        self.upsample = nn.Sequential(
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
            nn.Conv2d(features, features * 4, 3, 1, 1),
            nn.PixelShuffle(2),
            nn.PReLU(),
        )

        self.final = nn.Sequential(
            nn.Conv2d(features, out_channels, kernel_size=9, padding=4),
            nn.Tanh()
        )

    def forward(self, x):
        x1 = self.initial(x)
        
        # Multi-scale feature fusion
        x2 = self.multi_scale_fusion(x1)
        
        res = x1 + x2  # Combine initial and multi-scale fused features
        
        for block in self.res_blocks:
            res = res + block(res)  # Residual learning
        
        out = self.mid_conv(res)
        out = out + x1  # Add skip connection from initial input
        out = self.upsample(out)
        return self.final(out)
```

## 4. 融合
同时采用：
· 感知 + MS-SSIM + MSE + GAN 损失；
· 多尺度结构；
· 通道注意力；

## 5. 总结
| 实验名称           | 改进点类型  | 主要操作                               | 作用                 |
| -------------- | ------ | ---------------------------------- | ------------------ |
| **1. 损失函数改进**  | 损失函数层面 | 引入 **多种损失组合**，如感知损失（VGG）、MS-SSIM 等 | 更符合人类视觉感知，提升图像质量   |
| **2. 通道注意力机制** | 网络结构层面 | 在生成器中加入 **通道注意力模块（如 SE/CA）**       | 自适应关注重要特征通道，提升表示能力 |
| **3. 多尺度特征融合** | 网络结构层面 | 引入多个尺度（不同尺寸卷积核或下采样路径）进行特征融合        | 更好保留图像纹理和细节        |
| **4. 融合模型**    | 综合增强   | 同时引入注意力 + 多尺度 + 改进损失               | 协同提升性能，验证组合优势      |
