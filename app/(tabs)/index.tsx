import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function HomeScreen() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [dateString, setDateString] = useState("");

  const [results, setResults] = useState<any>(null);

  const onSubmit = () => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      alert("Please enter numbers for day, month, and year!");
      return;
    }

    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1 || y > 2500) {
      alert("Invalid date!");
      return;
    }

    const newDateString = `${m}${d}${y}`;
    setDateString(newDateString);

    const res = {
      prime: isPrime(newDateString),
      palindrome: isPalindrome(newDateString),
      pythagorean: isPythagorean(d, m, y),
      perfectPower: isPerfectPower(newDateString),
      armstrong: isArmstrong(newDateString),
      equation: isEquation(d, m, y),
      hex: toHex(m, d, y),
      hsl: toHSL(m, d, y),
    };

    setResults(res);
    setIsVisible(true);
  };

  // ✅ Prime
  const isPrime = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num) || num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // ✅ Palindrome
  const isPalindrome = (numString: string) =>
    numString === numString.split("").reverse().join("");

  // ✅ Pythagorean (day² + month² = year²)
  const isPythagorean = (day: number, month: number, year: number) =>
    day * day + month * month === year * year;

  // ✅ Perfect Power (base^exp = number, exp 2–9)
  const isPerfectPower = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num) || num <= 1) return false;
    for (let base = 2; base <= Math.sqrt(num); base++) {
      for (let exp = 2; exp <= 9; exp++) {
        if (Math.pow(base, exp) === num) return true;
      }
    }
    return false;
  };

  // ✅ Armstrong / Narcissistic
  const isArmstrong = (numString: string) => {
    const num = parseInt(numString, 10);
    if (isNaN(num)) return false;
    const digits = numString.length;
    const sum = numString
      .split("")
      .reduce((acc, ch) => acc + Math.pow(parseInt(ch, 10), digits), 0);
    return sum === num;
  };

  // ✅ Equation (check combinations of day, month, year)
  const isEquation = (day: number, month: number, year: number) => {
    return (
      day + month === year ||
      day - month === year ||
      day * month === year ||
      (month !== 0 && day / month === year) ||
      Math.pow(day, month) === year
    );
  };

  // ✅ HEX (#MMDDYY and #DDMMYY)
  const toHex = (month: number, day: number, year: number) => {
    const yy = year % 100; // last two digits
    const hex1 = `#${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}${yy.toString().padStart(2, "0")}`;
    const hex2 = `#${day.toString().padStart(2, "0")}${month
      .toString()
      .padStart(2, "0")}${yy.toString().padStart(2, "0")}`;
    return [hex1, hex2];
  };

  // ✅ HSL (hsl(MM, DD%, YY%) and hsl(DD, MM%, YY%))
  const toHSL = (month: number, day: number, year: number) => {
    const yy = year % 100; // last two digits
    const hsl1 = `hsl(${month}, ${day}%, ${yy}%)`;
    const hsl2 = `hsl(${day}, ${month}%, ${yy}%)`;
    return [hsl1, hsl2];
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Date Pattern Checker</Text>

      <TextInput
        style={styles.input}
        onChangeText={setMonth}
        placeholder="Month"
        keyboardType="numeric"
        maxLength={2}
        value={month}
      />
      <TextInput
        style={styles.input}
        onChangeText={setDay}
        placeholder="Day"
        keyboardType="numeric"
        maxLength={2}
        value={day}
      />
      <TextInput
        style={styles.input}
        onChangeText={setYear}
        placeholder="Year"
        keyboardType="numeric"
        maxLength={4}
        value={year}
      />

      <Button title="Do It" onPress={onSubmit} />

      {isVisible && results && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Results:</Text>
          <Text>Prime: {results.prime ? "True" : "False"}</Text>
          <Text>Palindrome: {results.palindrome ? "True" : "False"}</Text>
          <Text>Pythagorean: {results.pythagorean ? "True" : "False"}</Text>
          <Text>Perfect Power: {results.perfectPower ? "True" : "False"}</Text>
          <Text>Armstrong: {results.armstrong ? "True" : "False"}</Text>
          <Text>Equation: {results.equation ? "True" : "False"}</Text>
          <Text>Hex #MMDDYY: {results.hex[0]}</Text>
          <Text>Hex #DDMMYY: {results.hex[1]}</Text>
          <Text>HSL (MM,DD%,YY%): {results.hsl[0]}</Text>
          <Text>HSL (DD,MM%,YY%): {results.hsl[1]}</Text>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: results.hex[0],
              marginTop: 10,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 150,
    borderWidth: 1,
    borderColor: "#888",
    marginVertical: 8,
    padding: 10,
    backgroundColor: "white",
    textAlign: "center",
  },
  results: {
    marginTop: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});
