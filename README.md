# REACT2025Q1
## Initial Profiling with React Dev Tools Profiler
![1st list items render](https://github.com/user-attachments/assets/71ad982f-6afa-4493-9cce-3e0f4bf127f5)
![rerender because of hooks initialization](https://github.com/user-attachments/assets/1592c753-4635-4117-8b30-3a3c507f08b1)

- By the time 1st list items rendered, applicatatione rerendered 5 times, including initial render of CountriesList component, and 4 renders when CountriesList hooks changed, but these 5 rerenders took only 0,1s since CountriesList hooks got their initial states.

- It tooks 21ms to render all CountryItem components for the 1st time.
After that I pressed population button twice to sort list ascending and descending, but got 4 rerenders instead of 2 as I expected, probably because on each click it change 2 hooks and each triggered rerender. And because of rerender of CountriesList component, each CountryItem rerendered as well.
![rerender because of parent component](https://github.com/user-attachments/assets/6da66080-765e-4183-91a1-b768759a6aa1)

![somehow CountryItem took longer to rerender than CountriesList](https://github.com/user-attachments/assets/8db06fe1-884f-47da-904f-41c69c56c3ed)

- Then I changed region 3 times and it resulted in 9 rerenders beacuse it changes 3 states on each region selection and a few times it rerendered lots of CountryItem because the parent component rendered
![ragion selection](https://github.com/user-attachments/assets/acd82a88-991d-4b51-b138-39c942f10cbc)

- Finally I typed country name in name input and it took 24 renders since each input resulted in change of 3 states and again lots of child components rerendered as well.
![name input change](https://github.com/user-attachments/assets/c1691cfb-8e05-418c-9f2e-840d10e02b45)


## Update the App with React.memo and useMemo
- After adding memo to CountryItem, render duration reduced from 8-12ms to ~2ms after evey population sort, because CountryItem didn't rerender since it's props didn't change.
![image](https://github.com/user-attachments/assets/13cceb42-1669-4e01-ab11-d1b9e14ca18a)

- Same render optimization after filtering via region select, it took from 0,7ms to 3ms instead of 10ms to render, since CountryItem didn't rerender.
![image](https://github.com/user-attachments/assets/45f89569-f007-4352-9198-8956cfa61487)

- And again I typed in name input to filter via country name and render time reduced as well as commit time.
![image](https://github.com/user-attachments/assets/538fa029-932e-4050-9272-bbad0b0f3438)

- I replaced filtered and sorted states with useMemo values that resuslted in 2 initial renders instead of 6.
![image](https://github.com/user-attachments/assets/c96d7b14-aa10-4658-86e8-3f94253487a6)

- And it now takes only 1 render to sort countries instead of 2
![image](https://github.com/user-attachments/assets/96a5dff1-6814-4493-bfa7-2f4aaa8bd850)

- Same with gerion filter, it now renders 1 time on each reion select instead of 3, render time also reduced from 1,4ms to 0,6 ms.
![image](https://github.com/user-attachments/assets/c5ad40b5-34e7-403d-a6ec-526b91e163c2)
![image](https://github.com/user-attachments/assets/a4a5ba89-ca55-4c46-8ba2-a88fbff8ee92)

- And finally I typed text in name input and on every input only 1 state (seacrhQuery) changed so now it renders once, but the CountriesList render time increased from 0,4ms to 0,9-1,4ms so commit time didnt change much.
![image](https://github.com/user-attachments/assets/2ce1c16d-efcf-4dc9-bccb-37b241634e55)





