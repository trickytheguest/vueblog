# 模块-日期和时间模块


[[toc]]

## `calendar`模块

查看`calendar`模块有哪些函数或方法：

```py
$ python                                                                                              
Python 3.6.8 (tags/v3.6.8:3c6b436a57, Dec 24 2018, 00:16:47) [MSC v.1916 64 bit (AMD64)] on win32     
Type "help", "copyright", "credits" or "license" for more information.                                
>>> import calendar                                                                                   
>>> calendar.                                                                                         
calendar.Calendar(            calendar.WEDNESDAY            calendar.month_abbr                       
calendar.EPOCH                calendar.c                    calendar.month_name                       
calendar.FRIDAY               calendar.calendar(            calendar.monthcalendar(                   
calendar.February             calendar.datetime             calendar.monthrange(                      
calendar.HTMLCalendar(        calendar.day_abbr             calendar.prcal(                           
calendar.IllegalMonthError(   calendar.day_name             calendar.prmonth(                         
calendar.IllegalWeekdayError( calendar.different_locale(    calendar.prweek(                          
calendar.January              calendar.error(               calendar.repeat(                          
calendar.LocaleHTMLCalendar(  calendar.firstweekday(        calendar.setfirstweekday(                 
calendar.LocaleTextCalendar(  calendar.format(              calendar.sys                              
calendar.MONDAY               calendar.formatstring(        calendar.timegm(                          
calendar.SATURDAY             calendar.isleap(              calendar.week(                            
calendar.SUNDAY               calendar.leapdays(            calendar.weekday(                         
calendar.THURSDAY             calendar.main(                calendar.weekheader(                      
calendar.TUESDAY              calendar.mdays                                                          
calendar.TextCalendar(        calendar.month(                                                         
>>> calendar.                                                                                         
```

### 周一到周日

看源码可知`(MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY) = range(7)`，可知周一到周日是以数字0、1、2、3、4、5、6表示的。

```py
>>> calendar.MONDAY       
0                         
                          
>>> calendar.TUESDAY      
1                         
                          
>>> calendar.WEDNESDAY    
2                         
                          
>>> calendar.THURSDAY     
3                         
                          
>>> calendar.FRIDAY       
4                         
                          
>>> calendar.SATURDAY     
5                         
                          
>>> calendar.SUNDAY       
6                         
                          
>>>                       
```

### 每周的第一天

`calendar`默认将周一作为每周的第一天，你可以使用`setfirstweekday(weekday)`和`firstweekday()`来分别设置和获取每周的第一天：


```py
# 获取当前每周第一天
>>> calendar.firstweekday()
0

# 设置每周第一天为周日
>>> calendar.setfirstweekday(6)

# 获取当前每周第一天
>>> calendar.firstweekday()
6

# 设置每周第一天为周日
>>> calendar.setfirstweekday(calendar.SUNDAY)

# 获取当前每周第一天
>>> calendar.firstweekday()
6
```

### 闰年判断

使用`calendar.isleap(year)`判断年份`year`是否为闰年，是闰年时返回`True`，否则返回`False`：

```sh
>>> calendar.isleap?
Signature: calendar.isleap(year)
Docstring: Return True for leap years, False for non-leap years.
File:      d:\programfiles\python368\lib\calendar.py
Type:      function

# 2020年是闰年
>>> calendar.isleap(2020)
True

# 2000年也是闰年
>>> calendar.isleap(2000)
True

>>> calendar.isleap(1900)
False

>>> calendar.isleap(2021)
False
```


### 两个年份之间有多少个闰年

使用`calendar.leapdays(y1, y2)`获取两个年份之间有多少个闰年，包含`y1`年份，不包含`y2`年份，源码中并没有判断`y1`年份必须比`y2`年份小：

```py
>>> calendar.leapdays(1900,2020)
29

>>> calendar.leapdays(1900, 2021)
30

>>> calendar.leapdays(2000, 2020)
5

>>> calendar.leapdays(2000, 2021)
6

>>> calendar.leapdays(2020, 2000)
-5

>>> calendar.leapdays(2019, 2020)
0

>>> calendar.leapdays(2020, 2020)
0

>>> calendar.leapdays(2020, 2021)
1
```


### 指定日期为周几

```calendar.weekday(year, month, day)```可以获取指定日期是周几：

```py
# 2020年5月23日是周六
>>> calendar.weekday(2020, 5, 23)
5

# 2020年5月22日是周五
>>> calendar.weekday(2020, 5, 22)
4

>>> calendar.weekday(2020, 5, 21)
3

>>> calendar.weekday(2020, 5, 20)
2

>>> calendar.weekday(2020, 5, 19)
1

>>> calendar.weekday(2020, 5, 18)
0

>>> calendar.weekday(2020, 5, 17)
6

>>> calendar.weekday(1900, 5, 17)
3

# 年份不能是负数或0
>>> calendar.weekday(-1900, 5, 17)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-48-9594fb810542> in <module>
----> 1 calendar.weekday(-1900, 5, 17)

d:\programfiles\python368\lib\calendar.py in weekday(year, month, day)
    114     """Return weekday (0-6 ~ Mon-Sun) for year (1970-...), month (1-12),
    115        day (1-31)."""
--> 116     return datetime.date(year, month, day).weekday()
    117
    118

ValueError: year -1900 is out of range

>>> calendar.weekday(0, 5, 23)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-59-43ee5afa490e> in <module>
----> 1 calendar.weekday(0, 5, 23)

d:\programfiles\python368\lib\calendar.py in weekday(year, month, day)
    114     """Return weekday (0-6 ~ Mon-Sun) for year (1970-...), month (1-12),
    115        day (1-31)."""
--> 116     return datetime.date(year, month, day).weekday()
    117
    118

ValueError: year 0 is out of range
```


### 返回包含英文星期缩写的字符

`calendar.weekheader(n)`可以返回包含英文星期缩写的字符，`n`指定周一至周日英文字符的宽度：
```py
# 因为上面我们设置了每周第一天为周日，所以开始显示是Sun周日
>>> calendar.weekheader(3)
'Sun Mon Tue Wed Thu Fri Sat'

>>> calendar.weekheader(4)
'Sun  Mon  Tue  Wed  Thu  Fri  Sat '

>>> calendar.weekheader(5)
' Sun   Mon   Tue   Wed   Thu   Fri   Sat '

>>> calendar.weekheader(2)
'Su Mo Tu We Th Fr Sa'

>>> calendar.weekheader(1)
'S M T W T F S'

# 重新设置每周第一天为周一
>>> calendar.setfirstweekday(calendar.MONDAY)

# 此时可以看到Mon周一显示在前面
>>> calendar.weekheader(3)
'Mon Tue Wed Thu Fri Sat Sun'

>>> calendar.weekheader(4)
'Mon  Tue  Wed  Thu  Fri  Sat  Sun '

>>> calendar.weekheader(5)
' Mon   Tue   Wed   Thu   Fri   Sat   Sun '

>>> calendar.weekheader(2)
'Mo Tu We Th Fr Sa Su'

>>> calendar.weekheader(1)
'M T W T F S S'
```

### 月份的第一天是周几，月份有多少天

`calendar.monthrange(year, month)`可以返回指定月份的第一天是周几，以及该月的天数。

```py
>>> calendar.monthrange?
Signature: calendar.monthrange(year, month)
Docstring:
Return weekday (0-6 ~ Mon-Sun) and number of days (28-31) for
year, month.
File:      d:\programfiles\python368\lib\calendar.py
Type:      function

# 2020年5月第一天是周五，该月共31天
>>> calendar.monthrange(2020, 5)
(4, 31)

# 2020年4月第一天是周三，该月共30天
>>> calendar.monthrange(2020, 4)
(2, 30)

>>> calendar.monthrange(2020, 3)
(6, 31)

>>> calendar.monthrange(2020, 2)
(5, 29)

>>> calendar.monthrange(2020, 1)
(2, 31)
```

### 指定月份的日历列表

`calendar.monthcalendar(year, month)`可以返回指定月份的列表，每行代表一个星期，该月份以外的日期以0替代，默认以周一作为每周的第一天：

```py
>>> calendar.monthcalendar(2020, 5)
[[0, 0, 0, 0, 1, 2, 3],
 [4, 5, 6, 7, 8, 9, 10],
 [11, 12, 13, 14, 15, 16, 17],
 [18, 19, 20, 21, 22, 23, 24],
 [25, 26, 27, 28, 29, 30, 31]]

>>> calendar.monthcalendar(2020, 4)
[[0, 0, 1, 2, 3, 4, 5],
 [6, 7, 8, 9, 10, 11, 12],
 [13, 14, 15, 16, 17, 18, 19],
 [20, 21, 22, 23, 24, 25, 26],
 [27, 28, 29, 30, 0, 0, 0]]

>>> calendar.monthcalendar(2020, 3)
[[0, 0, 0, 0, 0, 0, 1],
 [2, 3, 4, 5, 6, 7, 8],
 [9, 10, 11, 12, 13, 14, 15],
 [16, 17, 18, 19, 20, 21, 22],
 [23, 24, 25, 26, 27, 28, 29],
 [30, 31, 0, 0, 0, 0, 0]]

>>> calendar.monthcalendar(2020, 2)
[[0, 0, 0, 0, 0, 1, 2],
 [3, 4, 5, 6, 7, 8, 9],
 [10, 11, 12, 13, 14, 15, 16],
 [17, 18, 19, 20, 21, 22, 23],
 [24, 25, 26, 27, 28, 29, 0]]

>>> calendar.monthcalendar(2020, 1)
[[0, 0, 1, 2, 3, 4, 5],
 [6, 7, 8, 9, 10, 11, 12],
 [13, 14, 15, 16, 17, 18, 19],
 [20, 21, 22, 23, 24, 25, 26],
 [27, 28, 29, 30, 31, 0, 0]]
```


### 打印指定月份的日历

`calendar.prmonth(theyear, themonth, w=0, l=0)`可以打印指定月份的日历，`w`指定星期字符的宽度，默认为0，内部限制至少为2; `l`指定两周之间换几行，默认值为0，内部限制至少换1行，实验可以发现`l`参数保持默认比较好，看起来比较紧凑：

```py
>>> calendar.prmonth?
Signature: calendar.prmonth(theyear, themonth, w=0, l=0)
Docstring: Print a month's calendar.
File:      d:\programfiles\python368\lib\calendar.py
Type:      method

# 默认星期字符宽度为2
>>> calendar.prmonth(2020, 5)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

>>> calendar.prmonth(2020, 4)
     April 2020
Mo Tu We Th Fr Sa Su
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30

>>> calendar.prmonth(2020, 3)
     March 2020
Mo Tu We Th Fr Sa Su
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31

# 设置星期字符宽度为3
>>> calendar.prmonth(2020, 5, w=3)
          May 2020
Mon Tue Wed Thu Fri Sat Sun
                  1   2   3
  4   5   6   7   8   9  10
 11  12  13  14  15  16  17
 18  19  20  21  22  23  24
 25  26  27  28  29  30  31

# 设置星期字符宽度为4
>>> calendar.prmonth(2020, 5, w=4)
             May 2020
Mon  Tue  Wed  Thu  Fri  Sat  Sun
                      1    2    3
  4    5    6    7    8    9   10
 11   12   13   14   15   16   17
 18   19   20   21   22   23   24
 25   26   27   28   29   30   31

# 设置星期字符宽度为2
>>> calendar.prmonth(2020, 5, w=2)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置星期字符宽度为1时，不起作用，还是保持为宽度为2
>>> calendar.prmonth(2020, 5, w=1)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置两周之间换1行
>>> calendar.prmonth(2020, 5, l=1)
      May 2020
Mo Tu We Th Fr Sa Su
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31

# 设置两周之间换2行
>>> calendar.prmonth(2020, 5, l=2)
      May 2020

Mo Tu We Th Fr Sa Su

             1  2  3

 4  5  6  7  8  9 10

11 12 13 14 15 16 17

18 19 20 21 22 23 24

25 26 27 28 29 30 31

# 设置两周之间换3行
>>> calendar.prmonth(2020, 5, l=3)
      May 2020


Mo Tu We Th Fr Sa Su


             1  2  3


 4  5  6  7  8  9 10


11 12 13 14 15 16 17


18 19 20 21 22 23 24


25 26 27 28 29 30 31



>>>
```

### 返回指定月份的多行文本字符串

`calendar.month(theyear, themonth, w=0, l=0)`可以返回指定月份的多行文本字符串，与`calendar.prmonth(theyear, themonth, w=0, l=0)`设置类似，可以理解为`calendar.prmonth`将`calendar.month`的返回值打印出来了：

```py
>>> calendar.month(2020, 5)
'      May 2020\nMo Tu We Th Fr Sa Su\n             1  2  3\n 4  5  6  7  8  9 10\n11 12 13 14 15 16 17\n18 19 20 21 22
23 24\n25 26 27 28 29 30 31\n'

>>> calendar.month(2020, 5, w=3)
'          May 2020\nMon Tue Wed Thu Fri Sat Sun\n                  1   2   3\n  4   5   6   7   8   9  10\n 11  12  13
 14  15  16  17\n 18  19  20  21  22  23  24\n 25  26  27  28  29  30  31\n'

>>> calendar.month(2020, 5, l=2)
'      May 2020\n\nMo Tu We Th Fr Sa Su\n\n             1  2  3\n\n 4  5  6  7  8  9 10\n\n11 12 13 14 15 16 17\n\n18 19
 20 21 22 23 24\n\n25 26 27 28 29 30 31\n\n'

>>> print(calendar.month(2020, 5, l=2))
      May 2020

Mo Tu We Th Fr Sa Su

             1  2  3

 4  5  6  7  8  9 10

11 12 13 14 15 16 17

18 19 20 21 22 23 24

25 26 27 28 29 30 31



>>>
```

### 打印指定年份的日历

calendar.prcal(year, w=0, l=0, c=6, m=3)
Prints the calendar for an entire year as returned by calendar().

calendar.calendar(year, w=2, l=1, c=6, m=3)
Returns a 3-column calendar for an entire year as a multi-line string using the formatyear() of the TextCalendar class.

calendar.timegm(tuple)
An unrelated but handy function that takes a time tuple such as returned by the gmtime() function in the time module, and returns the corresponding Unix timestamp value, assuming an epoch of 1970, and the POSIX encoding. In fact, time.gmtime() and timegm() are each others’ inverse.

The calendar module exports the following data attributes:

calendar.day_name
An array that represents the days of the week in the current locale.

calendar.day_abbr
An array that represents the abbreviated days of the week in the current locale.

calendar.month_name
An array that represents the months of the year in the current locale. This follows normal convention of January being month number 1, so it has a length of 13 and month_name[0] is the empty string.

calendar.month_abbr
An array that represents the abbreviated months of the year in the current locale. This follows normal convention of January being month number 1, so it has a length of 13 and month_abbr[0] is the empty string.

## `time`模块


## `datetime`模块


## `dateutil`模块


## `arrow`模块

## `fleming`模块



