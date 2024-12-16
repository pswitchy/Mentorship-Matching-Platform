import React from "react";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@nextui-org/react";
import { useFilters } from "@/hooks/useFilters";

export default function Filters() {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    selectWithPhoto,
    filters,
    totalCount,
    isPending,
  } = useFilters();

  const { gender, ageRange, orderBy } = filters;

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-default font-semibold text-xl">
            Results:{" "}
            {isPending ? (
              <Spinner
                size="sm"
                color="default"
              />
            ) : (
              totalCount
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div>Role:</div>
          {genderList.map(
            ({ icon: Icon, value }) => (
              <Button
                key={value}
                size="sm"
                isIconOnly
                color="default"
                variant={
                  gender.includes(value)
                    ? "solid"
                    : "light"
                }
                onClick={() =>
                  selectGender(value)
                }
              >
                <Icon size={24} />
              </Button>
            )
          )}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age range"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={ageRange}
            aria-label="Age range slider"
            color="foreground"
            onChangeEnd={(value) =>
              selectAge(value as number[])
            }
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">With photo</p>
          <Switch
            color="default"
            defaultSelected
            size="sm"
            onChange={(checked) =>
              selectWithPhoto(checked)
            }
          />
        </div>
        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="default"
            aria-label="Order by selector"
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
