import { useState } from "react";
import { useRouter } from "next/router";
import Table from "./Table";
import { usePagination, useFetch, useConfirm } from "core/hooks";
import {
  Select,
  IconButton,
  SearchBar,
  TableSortMenu,
  DateSortMenu,
  IconMapper
} from "core/ui";
import * as schemas from "lib/configs/table_schemas";

import { Paper, Box, Text, Stack } from "core/ui/_libs";

function Index({ model, ...props }) {
  const router = useRouter();
  const [limit, setLimit] = useState(5);

  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [searchParam, setSearchParam] = useState(schemas[model].defaultSearch);
  const [sortParams, setSortParams] = useState(schemas[model].defaultSort);
  const [timeRange, setTimeRange] = useState(null);

  const { showDialog, component: confirmDialog } = useConfirm();

  const selectFields = `_only=${Object.keys(schemas[model]?.properties).join(
    ","
  )}`;

  const time = timeRange ? `&updated_at=${timeRange}` : "";

  const searchFilter =
    searchParam && searchPhrase
      ? `${searchParam}._regex=/${searchPhrase}/`
      : "";

  const sorter =
    JSON.stringify(sortParams) !== "{}"
      ? Object.keys(sortParams)
          .map((param) => {
            return `_sort.${param}=${sortParams[param] === -1 ? "-1" : "1"}&`;
          })
          .join("")
          .slice(0, -1)
      : "";

  function getParams() {
    if ([...arguments].join("") === "") {
      return "";
    } else {
      return "?" + [...arguments].filter((arg) => arg !== "").join("&");
    }
  }

  const {
    page,
    data,
    first,
    next,
    prev,
    last,
    lastPage,
    getLastPage,
    getRecords,
    filter,
    count,
    resetCount
  } = usePagination({
    url: `/api/db/find/${model}${getParams(
      searchFilter,
      sorter,
      selectFields
    )}`,

    countUrl: `/api/db/count/${model}${getParams(searchFilter)}`,

    limit: limit
  });

  const searchData = (v) => {
    resetCount();
    setSearchPhrase(v);
  };

  const handleSearchParam = (v) => {
    setSearchPhrase(null);
    setSearchParam(v);
  };

  const handleSort = (sortObj) => {
    setSortParams(sortObj);
  };

  const handleChangeDates = (datesObject) => {
    resetCount();

    setTimeRange({ min: datesObject.from, max: datesObject.to });
  };

  const paginationButtons = [
    {
      onClick: first,
      icon: "paginate_first",
      tooltip: "First page"
    },
    {
      onClick: prev,
      icon: "paginate_prev",
      tooltip: "Previous page"
    },
    {
      onClick: next,
      icon: "paginate_next",
      tooltip: "Next page"
    },
    {
      onClick: getLastPage,
      icon: "paginate_last",
      tooltip: "Last page"
    }
  ];

  const deleteData = () => {
    async function handleDelete() {
      await fetch(`/api/db/delete_many/${model}?_id.in=${checked}`, {
        method: "DELETE"
      });

      filter(checked);
      setChecked([]);
      resetCount();
    }

    if (checked.length) {
      showDialog({
        title: "You are about to delete resource. Proceed?",
        accept: handleDelete
      });
    }
  };

  return (
    <>
      {model in schemas && (
        <Box component={Paper} sx={{ width: 1, p: 3 }}>
          <Box>
            <Text
              variant="h6"
              sx={{
                pr: 2
              }}
            >
              {schemas[model].title}
            </Text>
            {/* <Stack direction="row" sx={{ p: 2, pt: 3 }}>
           
          </Stack> */}

            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ pt: 4, pb: 2, mb: 2 }}
              spacing={{ xs: 2, md: 0 }}
            >
              <Box sx={{ mr: { xs: 0, md: 2 } }}>
                <Select
                  inputWidth={{ xs: "100%", md: "auto" }}
                  label="Search by"
                  size="small"
                  init={searchParam}
                  parentValue={searchParam}
                  options={schemas[model].searchable}
                  handleChange={handleSearchParam}
                  inputProps={{ fontSize: "0.875rem" }}
                  valueProp="key"
                  displayProp="value"
                />
              </Box>
              {/* <Box
                sx={{ width: { xs: "100%", md: "auto" }, pr: { xs: 0, md: 2 } }}
              > */}
              <SearchBar handleSearch={searchData} />
              {/* </Box> */}
              <Box sx={{ pl: { xs: 0, md: 2, lg: 2 } }}>
                <DateSortMenu handleSort={handleChangeDates} />
                <TableSortMenu
                  options={schemas[model].sortable}
                  valueProp="value"
                  keyProp="key"
                  initialProp="order"
                  handleSort={handleSort}
                />
                <IconButton
                  onClick={deleteData}
                  icon={<IconMapper icon="trash" color="icons.primary" />}
                />
              </Box>

              {confirmDialog}
            </Stack>
          </Box>
          <Table
            model={model}
            data={data}
            tableProps={schemas[model]?.properties}
            checked={checked}
            allChecked={allChecked}
            handleCheckAll={() => {
              const container = [];

              if (!allChecked) {
                data.map((el) => container.push(el["_id"]));
              }
              setChecked(container);
              setAllChecked(!allChecked);
            }}
            handleCheck={(e) => {
              const id = e.target.id;
              const copy = checked.slice();

              copy.includes(id)
                ? copy.splice(copy.indexOf(id), 1)
                : copy.push(id);

              setChecked(copy);
            }}
            redirect={(model, id) =>
              router.push({
                pathname: "/admin/" + schemas[model].subRoute + "/[model]/[id]",
                query: { model: model, id: id }
              })
            }
          />
          <Stack
            direction={{
              xs: "column",
              md: "row"
            }}
            spacing={{ xs: 2, md: 0 }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2, pt: 3 }}
          >
            <Select
              label="Rows"
              size="small"
              init={limit}
              parentValue={limit}
              options={[5, 10, 25, 40]}
              handleChange={setLimit}
              inputProps={{ fontSize: "0.75rem" }}
            />
            <Stack direction="column" alignItems="center">
              <Text variant="body2">{`Page ${page} of ${lastPage}`}</Text>
              <Text variant="body2">{`Records ${getRecords().join(
                " - "
              )} of ${count}`}</Text>
            </Stack>

            <Stack direction="row" alignItems="center">
              <>
                {paginationButtons.map((el) => (
                  <IconButton
                    key={el.tooltip}
                    size="small"
                    onClick={el.onClick}
                    tooltip={el.tooltip}
                    icon={<IconMapper icon={el.icon} color="icons.primary" />}
                  />
                ))}
              </>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
}

export default Index;

/// page 1 last record 5 page 2 last record
