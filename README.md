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
